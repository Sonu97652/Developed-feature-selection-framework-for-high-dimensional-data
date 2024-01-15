import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCompComponent } from './create-comp/create-comp.component';
import { DataSetsComponent } from './data-sets/data-sets.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'data-sets',
    component: DataSetsComponent
  }, 
  {
   path: 'create-comp',
   component: CreateCompComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
