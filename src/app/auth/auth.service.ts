import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, BehaviorSubject  } from 'rxjs';
import { Customer } from '../customer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   public isAuthenticated = new BehaviorSubject<boolean>(false);
   public customerObservable = new BehaviorSubject<Customer>(new Customer());
   //public customer: Customer = new Customer();
  constructor(private http: HttpClient) {
    
  }

  login(authRequest:any): Observable<boolean> {
    // const authRequest = {
    //   username: username,
    //   password: password
    // };
    return this.http.post('http://localhost:8081/authenticate', authRequest).pipe(
      map((response: any) => {
        console.log('response: ',JSON.stringify(response));
        const token =  response.jwtToken;
        if (token) {
          localStorage.setItem('token', token);
          this.isAuthenticated.next(true);
          this.customerObservable.next(this.getCustomer(token)) ;
          return true;
        } else {
          return false;
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.setAuthenticated(false);
  }

  setAuthenticated(value: boolean) {
    this.isAuthenticated.next(value);
  }

  getAuthenticated() {
    return this.isAuthenticated.asObservable();
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');//JSON.parse(localStorage.getItem('token') || '{}');
    
     return token!=null;
  }

  public getCustomer(token: string): any{
    if (!token) {
      return null;
    }
    console.log(JSON.stringify(JSON.parse(atob(token.split('.')[0]))));
    console.log(JSON.stringify(JSON.parse(atob(token.split('.')[1]))));
   // console.log(JSON.stringify(JSON.parse(atob(token.split('.')[2]))));
    return JSON.parse(atob(token.split('.')[1])) as Customer;
  }

}
