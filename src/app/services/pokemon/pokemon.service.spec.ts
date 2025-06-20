// pokemon.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { PokemonService } from './pokemon.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { PokemonListResponse } from 'src/app/models/pokemon.model';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpTestingController: HttpTestingController;
  const mockBaseUrl = 'https://pokeapi.co/api/v2/pokemon';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PokemonService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(PokemonService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch pokémons list with correct parameters', () => {
    const mockResponse: PokemonListResponse = {
      count: 1302,
      next: `${mockBaseUrl}?offset=20&limit=20`,
      previous: null,
      results: [{ name: 'bulbasaur', url: `${mockBaseUrl}/1/` }]
    };

    service.getPokemonsList(0, 20).subscribe(data => {
      expect(data.results.length).toBe(1);
      expect(data.results[0].name).toBe('bulbasaur');
      expect(data.count).toBe(1302);
    });

  const req = httpTestingController.expectOne(
    req => req.urlWithParams === `${mockBaseUrl}?offset=0&limit=20`
  );

    
   expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });

  it('should fetch pokemon by name', () => {
    const mockName = 'pikachu';
    const mockResponse = {
      id: 25,
      name: 'pikachu',
      types: [{ type: { name: 'electric' } }]
    };

    service.getPokemonByName(mockName).subscribe(data => {
      expect(data.name).toBe('pikachu');
    });

    const req = httpTestingController.expectOne(`${mockBaseUrl}/${mockName}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });
});