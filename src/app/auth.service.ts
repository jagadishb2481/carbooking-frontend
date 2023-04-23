import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, BehaviorSubject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   public isAuthenticated = new BehaviorSubject<boolean>(false);
 
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    const authRequest = {
      username: username,
      password: password
    };
    return this.http.post('http://localhost:8081/authenticate', authRequest).pipe(
      map((response: any) => {
        console.log('response: ',JSON.stringify(response));
        const token =  response.jwtToken;
        if (token) {
          localStorage.setItem('token', token);
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
}
