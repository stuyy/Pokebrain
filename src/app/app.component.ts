import { Component } from '@angular/core';
import { PokemonService } from './services/pokemon.service';
import Pokemon from './models/Pokemon';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokedex';
  public pokemonInput: string;
  public pokemonData: Pokemon;
  public searchType: string = "pokemon";
  public success: boolean = false;
  public errorOccured: boolean = false;
  public errorMessage: string;
  public loading: boolean = false;
  constructor(private pokemon: PokemonService) {

  }
  getPokemon() {
    console.log(this.searchType);
    this.success = false;
    this.loading = true;
    this.pokemon.getPokemon(this.pokemonInput)
    .subscribe((data: Pokemon) => {
      setTimeout(() => {
        this.pokemonData = data;
        this.success = true;
        this.errorOccured = false;
      }, 1000)
    },
    err => {
      this.success = false;
      this.errorOccured = true;
      this.errorMessage = err.error.msg;
      this.loading = false;
    }, () => {
      setTimeout(() => { this.loading = false }, 1000)
    });
  }
  closeAlert() {
    console.log(document.getElementById('err-alert'))
  }
}
