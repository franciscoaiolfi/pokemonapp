import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { DetailsPage } from './details.page';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { PokemonDetails } from 'src/app/models/pokemon.model';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavController } from '@ionic/angular';

describe('DetailsPage', () => {
  let component: DetailsPage;
  let fixture: ComponentFixture<DetailsPage>;
  let pokemonService: jasmine.SpyObj<PokemonService>;
  let route: ActivatedRoute;
  let location: jasmine.SpyObj<Location>;
  let router: jasmine.SpyObj<Router>;
  const navControllerSpy = jasmine.createSpyObj('NavController', [
    'navigateForward',
    'navigateBack',
    'pop',
  ]);

  const completeMockPokemon: PokemonDetails = {
    id: 25,
    name: 'pikachu',
    height: 4,
    weight: 60,
    base_experience: 112,
    sprites: {
      other: {
        'official-artwork': {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
        },
      },
    },
    types: [{ type: { name: 'electric' } }],
    abilities: [
      { ability: { name: 'static' } },
      { ability: { name: 'lightning-rod' } },
    ],
  };

  beforeEach(async () => {
    const pokemonServiceSpy = jasmine.createSpyObj('PokemonService', [
      'getPokemonByName',
    ]);
    const locationSpy = jasmine.createSpyObj('Location', ['back']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        DetailsPage,
        IonicModule.forRoot(),
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: PokemonService, useValue: pokemonServiceSpy },
        { provide: Location, useValue: locationSpy },
        { provide: Router, useValue: routerSpy },
        { provide: NavController, useValue: navControllerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => 'pikachu',
              },
            },
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsPage);
    component = fixture.componentInstance;
    pokemonService = TestBed.inject(
      PokemonService
    ) as jasmine.SpyObj<PokemonService>;
    location = TestBed.inject(Location) as jasmine.SpyObj<Location>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    route = TestBed.inject(ActivatedRoute);

    pokemonService.getPokemonByName.and.returnValue(of(completeMockPokemon));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load pokemon details on init', fakeAsync(() => {
    component.ngOnInit();
    tick();

    expect(pokemonService.getPokemonByName).toHaveBeenCalledWith('pikachu');
    expect(component.pokemon).toEqual(completeMockPokemon);
  }));

  it('should handle missing optional fields', fakeAsync(() => {
    const minimalPokemon: PokemonDetails = {
      id: 25,
      name: 'pikachu',
      height: 4,
      weight: 60,
      base_experience: 112,
      types: [],
      abilities: [],
    };

    pokemonService.getPokemonByName.and.returnValue(of(minimalPokemon));

    component.ngOnInit();
    tick();

    expect(component.pokemon).toEqual(minimalPokemon);
    expect(component.pokemonAbilities).toBe('');
    expect(component.pokemonTypes).toBe('');
  }));

  it('should handle API errors gracefully', fakeAsync(() => {
    pokemonService.getPokemonByName.and.returnValue(
      throwError(() => new Error('API error'))
    );
    spyOn(console, 'error');

    component.ngOnInit();
    tick();

    expect(console.error).toHaveBeenCalledWith(
      'Failed to fetch Pokémon details:',
      jasmine.any(Error)
    );
    expect(component.pokemon).toBeNull();
  }));

  it('should handle null route parameter', async () => {
    const emptyRoute = {
      snapshot: {
        paramMap: {
          get: () => null,
        },
      },
    };

    const pokemonServiceSpy = jasmine.createSpyObj('PokemonService', [
      'getPokemonByName',
    ]);
    const locationSpy = jasmine.createSpyObj('Location', ['back']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.resetTestingModule()
      .configureTestingModule({
        imports: [DetailsPage, IonicModule.forRoot()],
        providers: [
          provideHttpClient(),
          provideHttpClientTesting(),
          { provide: ActivatedRoute, useValue: emptyRoute },
          { provide: PokemonService, useValue: pokemonServiceSpy },
          { provide: Location, useValue: locationSpy },
          { provide: Router, useValue: routerSpy },
          { provide: NavController, useValue: navControllerSpy },
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      })
      .compileComponents();

    const emptyFixture = TestBed.createComponent(DetailsPage);
    const emptyComponent = emptyFixture.componentInstance;

    emptyComponent.ngOnInit();

    expect(emptyComponent.pokemonName).toBeNull();
    expect(emptyComponent.pokemon).toBeNull();
  });
});
