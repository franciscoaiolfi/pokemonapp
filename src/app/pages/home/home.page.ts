import { Component, OnInit } from '@angular/core';
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
} from '@ionic/angular/standalone';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { PokemonCard, PokemonListItem } from 'src/app/models/pokemon.model';
import { Router, RouterModule } from '@angular/router';
import { FavoriteService } from 'src/app/services/pokemon/favorite.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
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
  ],
})
export class HomePage implements OnInit {
  pokemons: PokemonCard[] = [];
  limit = 20;
  offset = 0;

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private favoriteService: FavoriteService
  ) {
    addIcons({ heart, heartOutline });
  }

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    this.pokemonService.getPokemonsList(this.offset, this.limit).subscribe({
      next: (response) => {
        const pokemons = response.results;
        this.pokemons = pokemons.map((p: PokemonListItem) => ({
          ...p,
          id: this.getIdFromUrl(p.url),
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.getIdFromUrl(
            p.url
          )}.png`,
        }));
        console.log(response);
      },
      error: (err) => {
        console.log('deu erro ');
      },
    });
  }

  getIdFromUrl(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2], 10);
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

  isFavorite(name: string): boolean {
    return this.favoriteService.isFavorite(name);
  }

  toggleFavorite(name: string): void {
    this.favoriteService.toggle(name);
  }
}
