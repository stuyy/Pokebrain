import { Component, OnInit, Input } from '@angular/core';
import Pokemon from 'src/app/models/Pokemon';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  @Input() pokemon;
  public typeBackgroundColor: string = '';
  constructor() {
    
  }

  ngOnInit() {
    console.log(this.pokemon)
    this.typeBackgroundColor = this.pokemon.types[0].toLowerCase() + "-bg";
  }

}
