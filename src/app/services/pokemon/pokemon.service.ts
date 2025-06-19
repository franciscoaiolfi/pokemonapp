import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonListResponse } from 'src/app/models/pokemon.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = environment.apiUrl
  constructor(private http: HttpClient) { }

  getPokemonsList(offset:number = 0, limit:number = 20):Observable<PokemonListResponse>{
    return this.http.get<PokemonListResponse>(`${this.baseUrl}?offset=${offset}&limit=${limit}`)
  }

  getPokemonByName(name:string){
    return this.http.get<any>(`${this.baseUrl}/${name}`)
  }
}
