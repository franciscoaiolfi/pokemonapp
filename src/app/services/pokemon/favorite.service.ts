import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private storageKey = 'favoritePokemons'

  constructor() { }

   getFavorites(): string[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

    isFavorite(name: string): boolean {
    return this.getFavorites().includes(name);
  }

    add(name: string): void {
    const favorites = this.getFavorites();
    if (!favorites.includes(name)) {
      favorites.push(name);
      this.save(favorites);
    }
  }

    remove(name: string): void {
    const favorites = this.getFavorites().filter(n => n !== name);
    this.save(favorites);
  }

    toggle(name: string): void {
    this.isFavorite(name) ? this.remove(name) : this.add(name);
  }

   private save(favorites: string[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }
}
