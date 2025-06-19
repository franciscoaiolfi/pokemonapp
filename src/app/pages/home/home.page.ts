import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HomePage implements OnInit {
  pokemons: any[]=[];
  limit = 20;
  offset = 0;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.loadPokemons()
  }

  loadPokemons(){
    this.pokemonService.getPokemonsList(this.offset,this.limit).subscribe({
      next:(response)=>{
        this.pokemons = response
        console.log(this.pokemons)
      },
      error:(err)=>{
        console.log('deu erro ')
      }
    })
  }

}
