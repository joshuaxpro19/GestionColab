import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path : 'dashboard', loadChildren: () => import('./features/features-module').then(m => m.FeaturesModule)
  },
  {
    path: '', redirectTo: 'dashboard/login', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
