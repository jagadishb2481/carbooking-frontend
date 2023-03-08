import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BookNowComponent } from './bookings/book-now/book-now.component';
import { AddcarComponent } from './cars/addcar/addcar.component';
import { BookCarsComponent } from './cars/book-cars/book-cars.component';
import { CarslistComponent } from './cars/carslist/carslist.component';
import { CustomerAddDialogComponent } from './customers/customer-add-dialog/customer-add-dialog.component';
import { CustomersListComponent } from './customers/customers-list/customers-list.component';
import { HomeComponent } from './home/home.component';
import { LocationListComponent } from './locations/location-list/location-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'login',component:LoginComponent},
  {path:'cars',component:CarslistComponent},
  {path:'customers',component:CustomersListComponent},
  {path:'locations',component:LocationListComponent},
  {path:'register',component:RegisterComponent},
  {path:'bookingHome',component:BookCarsComponent},
  {path:'bookingDetails',component:BookNowComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
