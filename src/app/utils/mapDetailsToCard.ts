import { PokemonCard, PokemonDetails } from "../models/pokemon.model";


export function mapDetailsToCard(pokemon: PokemonDetails): PokemonCard {
  return {
    name: pokemon.name,
    url: '', 
    id: pokemon.id,
    image: pokemon.sprites?.other?.['official-artwork']?.front_default ?? '',
    types: pokemon.types.map(t => t.type.name),
  };
}
