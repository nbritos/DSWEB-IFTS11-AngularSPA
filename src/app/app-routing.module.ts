import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrescopasComponent } from './components/trescopas/trescopas.component';
import { NavigationComponent } from './components/navigation/navigation.component';

const routes: Routes = [
  {
		path: 'argentina/trescopas',
		component: TrescopasComponent
	},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
