import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CarbookingService } from '../carbooking.service';
import { Customer } from '../customer';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  username: any;
  password: any;
  message: any
  error ='';
  
  constructor(private service:CarbookingService ,private router:Router, private authService:AuthService) { }

  ngOnInit() {
    
  }

  doLogin() {
    this.authService.login(this.username, this.password)
    .subscribe(data => {
      console.log("data is: "+JSON.stringify(data));
      this.message = data;
      this.authService.setAuthenticated(true);
     // window.localStorage.setItem("username",this.username);
      //window.localStorage.setItem("password",this.password);
     // localStorage.setItem('customerdata', JSON.stringify(data));
      this.router.navigate(["/bookingHome"]);     
    },
    error=>console.log(error));
  }
}
