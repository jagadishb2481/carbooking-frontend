import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule, MatInput} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CarslistComponent } from './cars/carslist/carslist.component';
import { AddcarComponent } from './cars/addcar/addcar.component';
import { MatIconModule } from '@angular/material/icon';
import { CarEditDialogComponent } from './cars/car-edit-dialog/car-edit-dialog.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CarAddDialogComponent } from './cars/car-add-dialog/car-add-dialog.component';
import { CustomersListComponent } from './customers/customers-list/customers-list.component';
import { CustomerEditDialogComponent } from './customers/customer-edit-dialog/customer-edit-dialog.component';
import { CustomerAddDialogComponent } from './customers/customer-add-dialog/customer-add-dialog.component';
import { RegisterComponent } from './register/register.component';
import { BookCarsComponent } from './cars/book-cars/book-cars.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ShowImageDialogComponent } from './show-image-dialog/show-image-dialog.component';
import { BookNowComponent } from './bookings/book-now/book-now.component';
import { LocationListComponent } from './locations/location-list/location-list.component';
import { LocationAddDialogComponent } from './locations/location-add-dialog/location-add-dialog.component';
import { LocationEditDialogComponent } from './locations/location-edit-dialog/location-edit-dialog.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AuthInterceptor } from './auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CarslistComponent,
    AddcarComponent,
    CarEditDialogComponent,
    ConfirmDialogComponent,
    CarAddDialogComponent,
    CustomersListComponent,
    CustomerEditDialogComponent,
    CustomerAddDialogComponent,
    RegisterComponent,
    BookCarsComponent,
    ShowImageDialogComponent,
    BookNowComponent,
    LocationListComponent,
    LocationAddDialogComponent,
    LocationEditDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule ,
    MatSelectModule,
    MatGridListModule,
    MatPseudoCheckboxModule,
    MatTooltipModule,
    MatRadioModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatAutocompleteModule,
    BrowserAnimationsModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
