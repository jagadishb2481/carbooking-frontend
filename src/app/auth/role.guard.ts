import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../customer';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      let isAuthorized=false;
      this.authService.customerObservable.subscribe(data => {
        console.log('customer:',JSON.stringify(data));
        isAuthorized= data.role=== route.data['role']; 
      })
      //const isAuthorized = this.authService.getCustomer.role===route.data['role'];

      if (!isAuthorized) {
        // redirect
        // display a message
        window.alert('You are not authorized!!!');
      }
  
      return isAuthorized || false;
  }
  
}
