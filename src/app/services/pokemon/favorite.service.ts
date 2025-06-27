import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';
import { BehaviorSubject, Observable } from 'rxjs';

const DB_NAME = 'poke-db';
const STORE_NAME = 'favorites';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private dbPromise: Promise<IDBPDatabase<unknown>>;
  private favoritesSubject = new BehaviorSubject<string[]>([]);
  public favorites$: Observable<string[]> = this.favoritesSubject.asObservable();

  constructor() {
    this.dbPromise = openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      },
    });
    this.init();
  }

  private async init(): Promise<void> {
    try {
      const db = await this.dbPromise;
      const keys = await db.getAllKeys(STORE_NAME);
      this.favoritesSubject.next(keys as string[]);
    } catch (error) {
      console.error('Failed to initialize favorite service:', error);
    }
  }

  public getFavorites(): string[] {
    return this.favoritesSubject.getValue();
  }

  public isFavorite(name: string): boolean {
    return this.getFavorites().includes(name);
  }

  public async add(name: string): Promise<void> {
    if (!this.isFavorite(name)) {
      const currentFavorites = this.getFavorites();
      const newFavorites = [...currentFavorites, name];
      this.favoritesSubject.next(newFavorites);
      try {
        const db = await this.dbPromise;
        await db.put(STORE_NAME, true, name);
      } catch (error) {
        console.error(`Failed to add favorite: ${name}`, error);
        this.favoritesSubject.next(currentFavorites);
      }
    }
  }

  public async remove(name: string): Promise<void> {
    const currentFavorites = this.getFavorites();
    const newFavorites = currentFavorites.filter((n) => n !== name);
    this.favoritesSubject.next(newFavorites);
    try {
      const db = await this.dbPromise;
      await db.delete(STORE_NAME, name);
    } catch (error) {
      console.error(`Failed to remove favorite: ${name}`, error);
      this.favoritesSubject.next(currentFavorites);
    }
  }

  public async toggle(name: string): Promise<void> {
    if (this.isFavorite(name)) {
      await this.remove(name);
    } else {
      await this.add(name);
    }
  }
}
