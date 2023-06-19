import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrescopasComponent } from './components/trescopas/trescopas.component';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProvinciaService } from './services/provincia.service';
import { SmbComponent } from './components/smb/smb.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    TrescopasComponent,
    HomeComponent,
    NavigationComponent,
    SmbComponent
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ProvinciaService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
