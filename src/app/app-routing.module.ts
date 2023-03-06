import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcarComponent } from './cars/addcar/addcar.component';
import { BookCarsComponent } from './cars/book-cars/book-cars.component';
import { CarslistComponent } from './cars/carslist/carslist.component';
import { CustomerAddDialogComponent } from './customers/customer-add-dialog/customer-add-dialog.component';
import { CustomersListComponent } from './customers/customers-list/customers-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent},
  {path:'cars',component:CarslistComponent},
  {path:'customers',component:CustomersListComponent},
  {path:'register',component:RegisterComponent},
  {path:'bookingHome',component:BookCarsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
