import { Component } from '@angular/core';
import { Car } from 'src/app/car';
import { CarbookingService } from 'src/app/carbooking.service';

@Component({
  selector: 'app-carslist',
  templateUrl: './carslist.component.html',
  styleUrls: ['./carslist.component.css']
})
export class CarslistComponent {
  cars: Car[] = [];
  //showEditForm: boolean = false;
  selectedCar: Car| null = null;
  constructor(private carService: CarbookingService) { }

  ngOnInit() {
    this.getCarsList();
  }

  deleteCar(id: number) {
    if (confirm(`Are you sure you want to delete the Car with id: ${id}?`)) {
    this.carService.deleteCar(id).subscribe(() => {
      this.cars = this.cars.filter(car => car.id !== id);
    });
    }
  }

  getCarsList(){
    this.carService.getCars().subscribe(data => {
      this.cars = data;
    });
  }

  editCar(car: Car) {
    this.selectedCar = Object.assign({}, car);
    //this.showEditForm = true;
  }
  cancelEdit(car:Car) {
    //this.showEditForm = false;
    this.selectedCar= null;
  }

  updateCar(car:Car) {
    if (confirm(`Are you sure you want to update the Car with id: ${car.id}?`)) {
    this.carService.updateCar(car).subscribe(() => {
      // TODO: Handle success and error cases
      //this.showEditForm = false;
      this.selectedCar= null;
    });
  }
  }
}
