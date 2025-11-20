import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing-module';
import { DashboardComponent } from './dashboard.component/dashboard.component';
import { SharedModule } from '../shared/shared-module';
import { ColaboradoresComponent } from './colaboradores.component/colaboradores.component';
import { LoginComponent } from './login.component/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    ColaboradoresComponent,
    LoginComponent
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
