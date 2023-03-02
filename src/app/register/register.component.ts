import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarbookingService } from '../carbooking.service';
import { Customer } from '../customer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private carbookingService: CarbookingService, private router: Router) { }
  customerdata:Customer = new Customer();
  msg='';
  onCancel(){
    this.router.navigate(['']);
  }
  onSave(){
    this.carbookingService.addCustomer(this.customerdata).subscribe(data => {
      // TODO: Handle success and error cases
      //this.showEditForm = false;
      this.msg = "You are successfully registered. Your customer id is: "+data.id;
      console.log("customer is:"+JSON.stringify(data));
      this.router.navigate(['/login']);
    });
    
  }
}
