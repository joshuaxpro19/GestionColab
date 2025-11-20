import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component/dashboard.component';
import { ColaboradoresComponent } from './colaboradores.component/colaboradores.component';

const routes: Routes = [
  {
    path: '', component : DashboardComponent
  },
  {
    path : 'lista-colaboradores', component : ColaboradoresComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
