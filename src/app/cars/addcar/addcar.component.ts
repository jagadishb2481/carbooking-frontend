import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/car';
import { CarbookingService } from 'src/app/carbooking.service';

@Component({
  selector: 'app-addcar',
  templateUrl: './addcar.component.html',
  styleUrls: ['./addcar.component.css']
})
export class AddcarComponent {

  newCar:Car = new Car();
  constructor(private carService: CarbookingService, private router: Router) { }

  onSubmit(){
    this.carService.addCar(this.newCar).subscribe(data => {
      // TODO: Handle success and error cases
      //this.showEditForm = false;
      console.log("car is:"+JSON.stringify(data));
      this.router.navigate(['/cars']);
    });
    
  }

}
