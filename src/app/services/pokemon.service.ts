import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Pokemon from '../models/Pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemon(pokemon) {
    return this.http.get<Pokemon>(`http://localhost:3100/pokemon/${pokemon}`);
  }
}
