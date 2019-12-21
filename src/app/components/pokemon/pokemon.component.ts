import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  @Input() pokemon;

  constructor() { }

  ngOnInit() {
    console.log("Hello")
    console.log(this.pokemon)
  }

}
