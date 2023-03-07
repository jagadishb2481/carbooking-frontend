import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { Car } from 'src/app/car';
import { CarbookingService } from 'src/app/carbooking.service';
import { ImageProcessingService } from 'src/app/image-processing.service';

@Component({
  selector: 'app-book-cars',
  templateUrl: './book-cars.component.html',
  styleUrls: ['./book-cars.component.css']
})
export class BookCarsComponent {
  url:string='';
  cars:Car[] = [];
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private carService: CarbookingService, private imageProcessingService: ImageProcessingService) {
    this.myForm = this.fb.group({
      location: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.getCarsList();
  }

  getCarsList() {
    this.carService.getCars().pipe(
      map((x: Car[], i) => x.map((car: Car) => this.imageProcessingService.createImage(car)))
    )
    .subscribe(data => {
      this.cars = data;
      console.log("cars array:"+JSON.stringify(this.cars));
      this.cars.forEach(car => {
         car.availabilityStatus = car.available ? "Available" : "Booked";
         car.imageurl = car.image.url;
      });
      // this.dataSource = new MatTableDataSource(this.cars);
      // this.dataSource.sort = this.sort;
      // this.dataSource.paginator = this.paginator;
      // console.log(JSON.stringify(this.dataSource));
    });
  }
 
  

  onSubmit() {
    console.log(this.myForm.value);
  }

  bookCar(car:any) {
    // Add your booking logic here
  }
  getImageUrl(image: string) {
    if (image) {
      return 'data:image/jpg;base64,' + image;
    } else {
      return '';
    }
  }

  
}
