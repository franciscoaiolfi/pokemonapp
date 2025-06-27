import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonButton,
  IonIcon,
  IonBackButton,
  IonButtons,
  IonSpinner,
  IonAlert
} from '@ionic/angular/standalone';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { PokemonCard } from 'src/app/models/pokemon.model';
import { FavoriteService } from 'src/app/services/pokemon/favorite.service';
import { mapDetailsToCard } from 'src/app/utils/mapDetailsToCard';
import { Subject, of, forkJoin } from 'rxjs';
import { switchMap, takeUntil, finalize, map } from 'rxjs/operators';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonImg,
    IonButton,
    IonIcon,
    IonBackButton,
    IonButtons,
    IonSpinner,
    IonAlert
  ],
})
export class FavoritesPage implements OnInit, OnDestroy {
  favorites: PokemonCard[] = [];
  isLoading = false;
  errorMessage: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private pokemonService: PokemonService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit() {
    this.favoriteService.favorites$
      .pipe(
        takeUntil(this.destroy$),
        switchMap((names) => {
          this.isLoading = true;
          this.errorMessage = null;
          if (names.length === 0) {
            this.favorites = [];
            return of([]);
          }
          const requests = names.map((name) =>
            this.pokemonService.getPokemonByName(name).pipe(
              map(details => ({ ...mapDetailsToCard(details), isFavorite: true }))
            )
          );
          return forkJoin(requests).pipe(
            finalize(() => this.isLoading = false)
          );
        })
      )
      .subscribe({
        next: (favorites) => {
          this.favorites = favorites;
        },
        error: (err) => {
          this.errorMessage = err.message;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
