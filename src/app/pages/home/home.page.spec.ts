import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { HomePage } from "./home.page";
import { PokemonService } from "src/app/services/pokemon/pokemon.service";
import { of } from "rxjs";
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { PokemonListResponse } from 'src/app/models/pokemon.model';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let pokemonService: PokemonService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        PokemonService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    pokemonService = TestBed.inject(PokemonService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load pokémons on init', fakeAsync(() => {
    const mockResponse: PokemonListResponse = {
      results: [
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }
      ],
      count: 1302,
      next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
      previous: null
    };

    spyOn(pokemonService, 'getPokemonsList').and.returnValue(of(mockResponse));
    
    component.ngOnInit();
    tick();
    
    expect(component.pokemons.length).toBe(1);
    expect(component.pokemons[0].id).toBe(25);
    expect(component.pokemons[0].image).toContain('25.png');
  }));

  it('should calculate ID from URL correctly', () => {
    const testUrl = 'https://pokeapi.co/api/v2/pokemon/150/';
    expect(component.getIdFromUrl(testUrl)).toBe(150);
  });
});