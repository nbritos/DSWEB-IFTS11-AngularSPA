import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrescopasComponent } from './components/trescopas/trescopas.component';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProvinciaService } from './services/provincia.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TrescopasComponent,
    HomeComponent,
    NavigationComponent,
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ProvinciaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
