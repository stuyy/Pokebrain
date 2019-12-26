import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-type',
  templateUrl: './pokemon-type.component.html',
  styleUrls: ['./pokemon-type.component.css']
})
export class PokemonTypeComponent implements OnInit {

  @Input() type: string;

  constructor() { }

  ngOnInit() {
    console.log(this.type);
  }

}
