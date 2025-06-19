import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { PokemonCard, PokemonListItem } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HomePage implements OnInit {
  pokemons: PokemonCard[]=[];
  limit = 20;
  offset = 0;


  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.loadPokemons()
    // this.loadPokemonsByName()
  }

  loadPokemons(){
    this.pokemonService.getPokemonsList(this.offset,this.limit).subscribe({
      next:(response)=>{
        const pokemons = response.results
        this.pokemons = pokemons.map((p:PokemonListItem)=>({
          ...p,
          id: this.getIdFromUrl(p.url),
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.getIdFromUrl(p.url)}.png`
        }))
        console.log(response)
      },
      error:(err)=>{
        console.log('deu erro ')
      }
    })
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
  // loadPokemonsByName(){
  //   this.pokemonService.getPokemonByName(this.name).subscribe({
  //        next:(response)=>{
  //       this.pokemonsByName = response
  //       console.log(this.pokemonsByName)
  //     },
  //     error:(err)=>{
  //       console.log('deu erro ')
  //     }
  //   })
  // }

}
