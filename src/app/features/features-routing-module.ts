import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component/layout.component';
import { DashboardComponent } from './dashboard.component/dashboard.component';
import { ColaboradoresComponent } from './colaboradores.component/colaboradores.component';
import { LoginComponent } from './login.component/login.component';
import { SedesComponent } from './sedes.component/sedes.component';
import { AreasComponent } from './areas.component/areas.component';
import { PuestosComponent } from './puestos.component/puestos.component';
import { HistorialComponent } from './historial.component/historial.component';
import { authGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'lista-colaboradores',
        component: ColaboradoresComponent
      },
      {
        path: 'sedes',
        component: SedesComponent
      },
      {
        path: 'areas',
        component: AreasComponent
      },
      {
        path: 'puestos',
        component: PuestosComponent
      },
      {
        path: 'historial',
        component: HistorialComponent
      }
    ]
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
