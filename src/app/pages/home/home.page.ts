import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { heart, heartOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonSpinner,
  IonAlert
} from '@ionic/angular/standalone';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { PokemonCard } from 'src/app/models/pokemon.model';
import { Router, RouterModule } from '@angular/router';
import { FavoriteService } from 'src/app/services/pokemon/favorite.service';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { CardPokemonComponent } from 'src/app/shared/components/card-pokemon/card-pokemon.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CardPokemonComponent,
    CommonModule,
    FormsModule,
    RouterModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonFooter,
    IonButtons,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonImg,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonIcon,
    IonSpinner,
    IonAlert
  ],
})
export class HomePage implements OnInit, OnDestroy {
  pokemons: PokemonCard[] = [];
  limit = 20;
  offset = 0;
  isLoading = false;
  errorMessage: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    public favoriteService: FavoriteService
  ) {
    addIcons({ heart, heartOutline });
  }

  ngOnInit() {
    this.loadPokemons();
    this.favoriteService.favorites$.pipe(takeUntil(this.destroy$)).subscribe(favorites => {
      this.pokemons = this.pokemons.map(p => ({ ...p, isFavorite: favorites.includes(p.name) }));
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadPokemons() {
    this.isLoading = true;
    this.errorMessage = null;
    this.pokemonService
      .getPokemonsList(this.offset, this.limit)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (pokemons) => {
          const favorites = this.favoriteService.getFavorites();
          this.pokemons = pokemons.map(p => ({ ...p, isFavorite: favorites.includes(p.name) }));
        },
        error: (err) => {
          this.errorMessage = err.message;
        },
      });
  }

  goToFavorites(): void {
    this.router.navigate(['/favorites']);
  }

  nextPage() {
    this.offset += this.limit;
    this.loadPokemons();
  }

  previousPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.loadPokemons();
    }
  }

  goToDetails(name: string): void {
    this.router.navigate(['/details', name]);
  }

  toggleFavorite(name: string): void {
    this.favoriteService.toggle(name);
  }
}
