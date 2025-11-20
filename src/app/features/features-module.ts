import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing-module';
import { DashboardComponent } from './dashboard.component/dashboard.component';
import { SharedModule } from '../shared/shared-module';
import { ColaboradoresComponent } from './colaboradores.component/colaboradores.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ColaboradoresComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    SharedModule
  ]
})
export class FeaturesModule { }
