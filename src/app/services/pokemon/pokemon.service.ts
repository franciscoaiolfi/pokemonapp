import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  PokemonCard,
  PokemonDetails,
  PokemonListResponse,
} from 'src/app/models/pokemon.model';
import { environment } from 'src/environments/environment';

const DEFAULT_LIMIT = 20;

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPokemonsList(
    offset: number = 0,
    limit: number = DEFAULT_LIMIT
  ): Observable<PokemonCard[]> {
    const params = new HttpParams()
      .set('offset', offset.toString())
      .set('limit', limit.toString());

    return this.http
      .get<PokemonListResponse>(this.baseUrl, { params })
      .pipe(
        map((response) =>
          response.results.map((p) => this.transformToPokemonCard(p))
        ),
        catchError(this.handleError)
      );
  }

  getPokemonByName(name: string): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(`${this.baseUrl}/${name}`).pipe(
      catchError(this.handleError)
    );
  }

  private transformToPokemonCard(pokemon: { name: string; url: string }): PokemonCard {
    const id = this.getIdFromUrl(pokemon.url);
    return {
      ...pokemon,
      id,
      image: this.getPokemonImageUrl(id),
    };
  }

  private getIdFromUrl(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2], 10);
  }

  private getPokemonImageUrl(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
