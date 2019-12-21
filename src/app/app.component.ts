import { Component } from '@angular/core';
import { PokemonService } from './services/pokemon.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokedex';
  public pokemonInput: string;
  public pokemonData: any;
  public success: boolean = false;
  constructor(private pokemon: PokemonService) {
    
  }
  getPokemon() {
    this.pokemon.getPokemon(this.pokemonInput)
    .subscribe((data: any) => {
      this.pokemonData = data;
      this.success = true;
      console.log(this.pokemonData);
    },
    err => {
      console.log(err.error);
      this.success = false;
    });
  }
}
