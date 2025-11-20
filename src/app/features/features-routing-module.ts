import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component/dashboard.component';
import { ColaboradoresComponent } from './colaboradores.component/colaboradores.component';
import { LoginComponent } from './login.component/login.component';
import { authGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '', 
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'lista-colaboradores', 
    component: ColaboradoresComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login', 
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
