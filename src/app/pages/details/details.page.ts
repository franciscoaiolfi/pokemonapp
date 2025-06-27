import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonBackButton,
  IonButtons,
  IonSpinner,
  IonAlert
} from '@ionic/angular/standalone';
import { PokemonDetails } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonBackButton,
    IonButtons,
    IonSpinner,
    IonAlert
  ],
})
export class DetailsPage implements OnInit, OnDestroy {
  pokemon: PokemonDetails | null = null;
  pokemonAbilities: string = '';
  pokemonTypes: string = '';
  isLoading = false;
  errorMessage: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params) => {
          const name = params.get('name');
          if (name) {
            this.isLoading = true;
            this.errorMessage = null;
            return this.pokemonService.getPokemonByName(name).pipe(
              finalize(() => this.isLoading = false)
            );
          }
          this.router.navigate(['/']);
          return [];
        })
      )
      .subscribe({
        next: (data) => {
          this.pokemon = data;
          this.pokemonAbilities =
            data.abilities?.map((a) => a.ability.name).join(', ') || '';
          this.pokemonTypes = data.types?.map((t) => t.type.name).join(', ') || '';
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
