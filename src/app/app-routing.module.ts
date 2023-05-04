import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrescopasComponent } from './components/trescopas/trescopas.component';
import { SmbComponent } from './components/smb/smb.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'argentina/trescopas',
    component: TrescopasComponent,
    canActivate:[AuthGuard]
  }, 
  {
    path: 'smb',
    component: SmbComponent
  },
  {
		path: '**',
		redirectTo:'/smb'
	},
  {
    path:'',
    redirectTo:'/smb',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
