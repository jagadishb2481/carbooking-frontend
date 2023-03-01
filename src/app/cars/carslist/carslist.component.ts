import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Car } from 'src/app/car';
import { CarbookingService } from 'src/app/carbooking.service';
import { MatDialog } from '@angular/material/dialog';
import { CarEditDialogComponent } from '../car-edit-dialog/car-edit-dialog.component';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-carslist',
  templateUrl: './carslist.component.html',
  styleUrls: ['./carslist.component.css']
})
export class CarslistComponent {
  cars: Car[]  = [];
  //showEditForm: boolean = false;
  selectedCar: Car| null = null;

  displayedColumns: string[] = ['id', 'name', 'model', 'makeYear', 'carType', 'color', 'plateNumber', 'pricePerDay', 'availabilityStatus', 'actions'];
  dataSource = new MatTableDataSource<Car>();
  filterValue: string = '';
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  pageSize = 5;
  constructor(private carService: CarbookingService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getCarsList();
  }

  getCarsList(){
    this.carService.getCars().subscribe(data => {
      this.cars = data;
      this.cars.forEach(car => {
      car.availabilityStatus = car.available ? "Available" : "Booked";
     });
     this.dataSource = new MatTableDataSource(this.cars);
     this.dataSource.sort = this.sort;
     this.dataSource.paginator=this.paginator;
    // console.log(JSON.stringify(this.dataSource));
    });
  }

  deleteCar(id: number) {
    if (confirm(`Are you sure you want to delete the Car with id: ${id}?`)) {
    this.carService.deleteCar(id).subscribe(() => {
      this.cars = this.cars.filter(car => car.id !== id);
    });
    }
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
  applyFilter(event:Event) {
    console.log("inside filter");
    this.filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  openEditDialog(car: Car): void {
    const dialogRef = this.dialog.open(CarEditDialogComponent, {
      width: '400px',
      data: car
    });
  
    
    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.carUpdated){
        this.getCarsList();
      }
      else if (result) {
        const index = this.dataSource.data.indexOf(car);
        this.dataSource.data[index] = result;
        this.dataSource._updateChangeSubscription();
      }

    });
  }

  openDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        message: `Are you sure you want to delete the car with id: ${id} ?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Call your service here to delete the car data
        this.carService.deleteCar(id).subscribe(() => {
          this.cars = this.cars.filter(car => car.id !== id);
          this.dataSource = new MatTableDataSource(this.cars);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator=this.paginator;
        });
      }
    });
  }

}
