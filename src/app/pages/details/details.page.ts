import { Component, OnInit } from '@angular/core';
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
} from '@ionic/angular/standalone';
import { PokemonDetails } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
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
  ],
})
export class DetailsPage implements OnInit {
  pokemonName: string | null = null;
  pokemon: PokemonDetails | null = null;
  pokemonAbilities: string = '';
  pokemonTypes: string = '';

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getRouteParams();
  }

  private getRouteParams(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.pokemonName = name;
      this.loadPokemonDetails(name);
    }
  }
  private loadPokemonDetails(name: string): void {
    this.pokemonService.getPokemonByName(name).subscribe({
      next: (data) => {
        this.pokemon = data;
        this.pokemonAbilities =
          data.abilities?.map((a) => a.ability.name).join(', ') || '';
        this.pokemonTypes =
          data.types?.map((t) => t.type.name).join(', ') || '';
      },
      error: (err) => console.error('Failed to fetch Pokémon details:', err),
    });
  }
  handleBackClick(event: Event): void {
    event.preventDefault();
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }
}
