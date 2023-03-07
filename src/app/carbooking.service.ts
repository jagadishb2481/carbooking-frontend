import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CarbookingService {

  //headers:HttpHeaders;
  private baseUrl = 'http://localhost:8081/';
  private carsUrl = 'http://localhost:8081/cars/';
  private customersUrl = 'http://localhost:8081/api/customers/';
  constructor(private http:HttpClient, private router:Router) { }

  login(customer:Customer):Observable<any>{
    /* this.checkAuthenticated();
     const headers=this.headers;
     return this.http.delete(`${this.baseUrl}/deleteUser/${id}`,{headers});
     */
     return this.http.post(`${this.baseUrl}`+'/login', customer);
   }

   getCars(): Observable<any> {
    return this.http.get<any>(this.baseUrl+'/cars');
  }

  getCar(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}+cars'+/${id}`);
  }

  addCar(car: any): Observable<any> {
    return this.http.post<any>(this.carsUrl, car);
  }

  updateCar(car: any, id:number): Observable<any> {
       return this.http.put<any>(`${this.carsUrl}${id}`, car);
  }

  deleteCar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.carsUrl}/${id}`);
  }

// services of Customer
  getCustomers(): Observable<any> {
    return this.http.get<any>(this.customersUrl);
  }

  getCustomer(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}+cars'+/${id}`);
  }

  addCustomer(customer: any): Observable<any> {
    return this.http.post<any>(this.customersUrl, customer);
  }

  updateCustomer(customer: any): Observable<any> {
    return this.http.put<any>(`${this.customersUrl}/${customer.id}`, customer);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete<any>(`${this.customersUrl}/${id}`);
  }


}
