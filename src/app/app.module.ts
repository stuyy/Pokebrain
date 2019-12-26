import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule } from '@angular/forms';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { PokemonTypeComponent } from './components/pokemon-type/pokemon-type.component';
import { ModalModule } from 'ngx-bootstrap/modal';
@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    PokemonTypeComponent
  ],
  imports: [
    BrowserModule,
    ButtonsModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ProgressbarModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
