import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
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
    IonButtons
} from '@ionic/angular/standalone';

import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { PokemonCard, PokemonDetails } from 'src/app/models/pokemon.model';
import { FavoriteService } from 'src/app/services/pokemon/favorite.service';
import { mapDetailsToCard } from 'src/app/utils/mapDetailsToCard';

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
      IonButtons
  ],
})
export class FavoritesPage implements OnInit {
  favorites: PokemonCard[] = [];

  constructor(
    private pokemonService: PokemonService,
    private favoriteService: FavoriteService,
    private location: Location
  ) {}

  ngOnInit() {
    const names = this.favoriteService.getFavorites();

    for (const name of names) {
      this.pokemonService.getPokemonByName(name).subscribe({
        next: (poke: PokemonDetails) => {
          const card = mapDetailsToCard(poke);
          this.favorites.push({ ...card, isFavorite: true });
        },
        error: () => {
          console.warn(`Não foi possível carregar ${name}`);
        },
      });
    }
  }
  handleBackClick(event: Event): void {
  event.preventDefault();
  this.location.back();
}

}
