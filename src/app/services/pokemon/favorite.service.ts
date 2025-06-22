// favorite.service.ts
import { Injectable } from '@angular/core';
import { openDB } from 'idb';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private dbPromise = openDB('poke-db', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('favorites')) {
        db.createObjectStore('favorites');
      }
    },
  });

  private cache: string[] = [];

  constructor() {
    this.init();
  }

  private async init() {
    const db = await this.dbPromise;
    const keys = await db.getAllKeys('favorites');
    this.cache = keys as string[];
  }

  public getFavorites(): string[] {
    return this.cache;
  }

  public isFavorite(name: string): boolean {
    return this.cache.includes(name);
  }

  public async add(name: string): Promise<void> {
    if (!this.isFavorite(name)) {
      this.cache.push(name);
      const db = await this.dbPromise;
      await db.put('favorites', true, name);
    }
  }

  public async remove(name: string): Promise<void> {
    this.cache = this.cache.filter(n => n !== name);
    const db = await this.dbPromise;
    await db.delete('favorites', name);
  }

  public async toggle(name: string): Promise<void> {
    if (this.isFavorite(name)) {
      await this.remove(name);
    } else {
      await this.add(name);
    }
  }
}
