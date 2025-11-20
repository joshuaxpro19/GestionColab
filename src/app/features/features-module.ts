import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing-module';
import { LayoutComponent } from './layout.component/layout.component';
import { DashboardComponent } from './dashboard.component/dashboard.component';
import { SharedModule } from '../shared/shared-module';
import { ColaboradoresComponent } from './colaboradores.component/colaboradores.component';
import { LoginComponent } from './login.component/login.component';
import { SedesComponent } from './sedes.component/sedes.component';
import { AreasComponent } from './areas.component/areas.component';
import { PuestosComponent } from './puestos.component/puestos.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    ColaboradoresComponent,
    LoginComponent,
    SedesComponent,
    AreasComponent,
    PuestosComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FeaturesModule { }
