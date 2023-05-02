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
  // username: any;
  // password: any;
  message: any;
  errormsg ='';
  frm!:FormGroup;
  constructor(private service:CarbookingService ,private router:Router,private fb:FormBuilder, private authService:AuthService) { }

  ngOnInit() {
    this.frm= this.fb.group({
      'username':['',Validators.required],
      'password':['',Validators.required]
    })
  }
  get f(){
    return this.frm.controls;  // needed for validation in html file 
  }

  doLogin() {
    if(this.frm.valid){
      this.authService.login(this.frm.value)
      .subscribe(data => {
        console.log("data is: "+JSON.stringify(data));
        this.message = data;
        this.authService.setAuthenticated(true);
        this.router.navigate(["/bookingHome"]);     
      },
      error=>{this.errormsg='Username or Password is Wrong ';
        console.log(error)});
    }
   

    }
    
}
