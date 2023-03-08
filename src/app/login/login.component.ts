import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CarbookingService } from '../carbooking.service';
import { Customer } from '../customer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  username: any;
  password: any;
  message: any
  customer:Customer = new Customer();

  constructor(private service:CarbookingService ,private router:Router) { }

  ngOnInit() {
    
  }

  doLogin() {
    //console.log("username is: "+this.username +" password is: "+this.password);
     this.service.login(this.customer)
    .subscribe(data => {
      console.log("data is: "+JSON.stringify(data));
      this.message = data;
     // window.localStorage.setItem("username",this.username);
      //window.localStorage.setItem("password",this.password);
      localStorage.setItem('customerdata', JSON.stringify(data));
      this.router.navigate(["/bookingHome"]);     
    },
    error=>console.log(error));
  }
}
