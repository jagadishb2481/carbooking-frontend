import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { Car } from 'src/app/car';
import { CarbookingService } from 'src/app/carbooking.service';
import { ImageProcessingService } from 'src/app/image-processing.service';
import { Location } from 'src/app/locations/location';

@Component({
  selector: 'app-book-cars',
  templateUrl: './book-cars.component.html',
  styleUrls: ['./book-cars.component.css']
})
export class BookCarsComponent {
  url: string = '';
  cars: Car[] = [];
  locations: Location[] = [];
  myForm: FormGroup;
  filteredLocations: Observable<Location[]> = of([]);
  filterValue = '';
  msg = '';
  //@ViewChild('fromDatepicker') fromDatepicker:  MatDatepickerInput<Date> = new MatDatepickerInput();
  minDate = new Date();
  constructor(private fb: FormBuilder, private service: CarbookingService, private imageProcessingService: ImageProcessingService, private router: Router) {
    this.myForm = this.fb.group({
      location: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });
    
    this.myForm.valueChanges.subscribe(() => {
      if (this.myForm.valid) {
        this.onSubmit();
      }
    });

  }

  ngOnInit() {
    this.getCarsList();
    this.getAllLocations();
  }

  getAllLocations() {
    this.service.getAllLocations().subscribe(data => {
      this.locations = data;
      this.filteredLocations = of(this.locations);
    });
  }

  searchLocations(event: any) {
    this.filteredLocations = of(this.filterLocations(event.value));
  }

  filterLocations(value: string): Location[] {
    this.filterValue = value.toLowerCase();
    return this.locations.filter(location => location.name.toLowerCase().includes(this.filterValue) ||
      location.address.toLowerCase().includes(this.filterValue) ||
      location.city.toLowerCase().includes(this.filterValue) ||
      location.country.toLowerCase().includes(this.filterValue) ||
      location.zipcode.toLowerCase().includes(this.filterValue));
  }

  displayLocation(location: Location): string {
    return location && location.name ? location.address + "," + location.name + "," + location.zipcode : '';
  }

  getCarsList() {
    this.service.getCars().pipe(
      map((x: Car[], i) => x.map((car: Car) => this.imageProcessingService.createImage(car)))
    )
      .subscribe(data => {
        this.cars = data;
       // console.log("cars array:" + JSON.stringify(this.cars));
        this.cars.forEach(car => {
          car.availabilityStatus = car.available ? "Available" : "Booked";
          car.imageurl = car.image.url;
        });
      });
  }



  onSubmit() {
    console.log("inside onsubmit");
    if(this.myForm.valid){
      console.log(this.myForm.get('location'));
      const request = {
        location: this.myForm.get('location')?.value,
        fromDate: this.myForm.get('fromDate')?.value,
        toDate: this.myForm.get('toDate')?.value,
      };
  
      console.log("request : "+ JSON.stringify(request));
      this.service.getAvailableCars(request).pipe(
        map((x: Car[], i) => x.map((car: Car) => this.imageProcessingService.createImage(car)))
      )
        .subscribe(data => {
          this.cars = data;
          console.log("cars array:" + JSON.stringify(this.cars));
          this.cars.forEach(car => {
            //car.availabilityStatus = car.available ? "Available" : "Booked";
            car.imageurl = car.image.url;
          });
        });
    }


  }

  onSelect(car: Car) {

    if(this.myForm.valid){
      this.router.navigate(['/bookingDetails']);
    }else{
      this.msg = "Please enter the values in required fields Location, From Date and To Date "
    }
    

  }


}
