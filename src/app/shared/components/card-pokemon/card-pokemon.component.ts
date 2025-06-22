import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { PokemonCard } from 'src/app/models/pokemon.model';
import { FavoriteService } from 'src/app/services/pokemon/favorite.service';
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-card-pokemon',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonImg,
    IonButton,
    IonIcon,
  ],
  templateUrl: './card-pokemon.component.html',
  styleUrls: ['./card-pokemon.component.scss'],
})
export class CardPokemonComponent implements OnInit {
  @Input() pokemon!: PokemonCard;
  isFavoriteStatus = false;

  constructor(private favoriteService: FavoriteService) {
    addIcons({ heart, heartOutline });
  }

  ngOnInit(): void {
    this.isFavoriteStatus = this.favoriteService.isFavorite(this.pokemon.name);
  }

async toggleFavorite(event: Event): Promise<void> {
  event.stopPropagation();
  await this.favoriteService.toggle(this.pokemon.name);
  this.isFavoriteStatus = await this.favoriteService.isFavorite(this.pokemon.name);
}
}
