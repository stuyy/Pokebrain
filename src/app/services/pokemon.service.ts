import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Pokemon {
  name: string;
  weight: Number;
  height: Number;
  base_experience: Number;
  abilities: Array<any>;
}
@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemon(pokemon) {
    return this.http.get<Pokemon>(`http://localhost:3100/pokemon/${pokemon}`);
  }
}
