import { Component, TemplateRef } from '@angular/core';
import { PokemonService } from './services/pokemon.service';
import Pokemon from './models/Pokemon';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public pokemonInput: string = '';
  public pokemonData: Pokemon;
  public searchType: string = "pokemon";
  public success: boolean = false;
  public errorOccured: boolean = false;
  public errorMessage: string;
  public loading: boolean = false;
  modalRef: BsModalRef;
  constructor(private pokemon: PokemonService,
    private modalService: BsModalService) {

  }
  getPokemon() {
    if(this.pokemonInput === '')
    {
      this.success = false;
      this.errorOccured = true;
      this.errorMessage = 'You must enter something'
      this.loading = false;
    }
    else {
      this.success = false;
      this.loading = true;
      this.pokemon.getPokemon(this.pokemonInput.toLowerCase())
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
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
