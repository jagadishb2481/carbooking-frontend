import { Component, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, Observable, of, startWith } from 'rxjs';
import { Car } from 'src/app/car';
import { CarbookingService } from 'src/app/carbooking.service';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { Location } from 'src/app/locations/location';

@Component({
  selector: 'app-car-edit-dialog',
  templateUrl: './car-edit-dialog.component.html',
  styleUrls: ['./car-edit-dialog.component.css']
})
export class CarEditDialogComponent {

  constructor(public dialogRef: MatDialogRef<CarEditDialogComponent>, private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Car, private service: CarbookingService, private router: Router) { }
  @Output() carUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();
  fileName: string = '';
  filterValue ='';
  locations:Location[]=[];
  filteredLocations: Observable<Location[]> = of([]);
  ngOnInit(){
    this.service.getAllLocations().subscribe(locations => {
      this.locations = locations;
      if(this.data.location.name){
        this.filteredLocations = of(this.filterLocations(this.filterValue));
      }
      
    });
  }

  searchLocations(event:any){
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
    return location && location.name ? location.address + ","+location.name +","+location.zipcode: '';
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  onUpdate(): void {
    console.log("updating car details of id:" + this.data.id);
    const dialogref = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        message: `Are you sure you want to update the car of Id: ${this.data.id}?`
      }
    });
    dialogref.afterClosed().subscribe(result => {
      if (result) {
        if (this.data.availabilityStatus == "Available") {
          this.data.available = true;
        } else {
          this.data.available = false;
        }
        const formData = new FormData();
        formData.append('name', this.data.name);
        formData.append('model', this.data.model);
        formData.append('makeYear', this.data.makeYear);
        formData.append('carType', this.data.carType);
        formData.append('color', this.data.color);
        formData.append('pricePerDay', String(this.data.pricePerDay));
        formData.append('plateNumber', this.data.plateNumber);
        formData.append('location', JSON.stringify(this.data.location));
        formData.append('image', this.data.image);
       // formData.append('id', String(this.data.id));
        this.service.updateCar(formData, this.data.id).subscribe(() => {
          this.router.navigate(['/cars']);
          this.carUpdated.emit(true);
        });
      } else {
        //this.dialogRef.close(this.data);
        this.router.navigate(['/cars']);
        this.carUpdated.emit(false);
      }
      
      
      this.dialogRef.close(this.data);
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.data.image = file;
  }

}