import { NonNullAssert } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Customer } from '../customer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
   customer : Customer = new Customer();
  role = '';
  //isAuthenticated = false;
  constructor(public authService:AuthService, private router:Router) { }
  ngOnInit() {
    //this.isAuthenticated = this.authService.isLoggedIn();
    let customerData = localStorage.getItem('customerdata');
    console.log("customerData:" + JSON.stringify(customerData));
    if (customerData) {
      this.customer = JSON.parse(customerData);
      this.role = this.customer.role;
      console.log("role:" + this.role)
    }
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['\login']);
  }
}
