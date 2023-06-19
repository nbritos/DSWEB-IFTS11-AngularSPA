import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrescopasComponent } from './components/trescopas/trescopas.component';
import { SmbComponent } from './components/smb/smb.component';

import { AuthGuard } from './auth.guard';
import { HomeComponent } from './components/home/home.component';
// import { UsuarioIngresarComponent } from './components/usuario-ingresar/usuario-ingresar.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  // {
  //   path: '**',
  //   redirectTo: 'home'
  // },
  {
    path: 'trescopas',
    component: TrescopasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'smb',
    component: SmbComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
