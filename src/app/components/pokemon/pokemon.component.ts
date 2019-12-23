import { Component, OnInit, Input } from '@angular/core';
import Pokemon from 'src/app/models/Pokemon';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  @Input() pokemon;

  constructor() {
    
  }

  ngOnInit() {
    console.log(this.pokemon.stats)
  }

}
