import { Component, Inject, EventEmitter, Output} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Car } from 'src/app/car';
import { CarbookingService } from 'src/app/carbooking.service';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-car-add-dialog',
  templateUrl: './car-add-dialog.component.html',
  styleUrls: ['./car-add-dialog.component.css']
})
export class CarAddDialogComponent {
  constructor(public dialogRef: MatDialogRef<CarAddDialogComponent>, private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Car, private service: CarbookingService, private router: Router) { }
  @Output() carAdded: EventEmitter<boolean> = new EventEmitter<boolean>();

  cardata : Car = new Car();
  fileName: string = '';
  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
   
    //console.log("updating car details of id:" + this.data.id);
    const dialogref = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        message: `Are you sure you want to Add this Car ?`
      }
    });
    dialogref.afterClosed().subscribe(result => {
      if (result) {

        if (this.cardata.availabilityStatus == "Available") {
          this.cardata.available = true;
        } else {
          this.cardata.available = false;
        }
        const formData = new FormData();
        formData.append('name', this.cardata.name);
        formData.append('model', this.cardata.model);
        formData.append('makeYear', this.cardata.makeYear);
        formData.append('carType', this.cardata.carType);
        formData.append('color', this.cardata.color);
        formData.append('pricePerDay', String(this.cardata.pricePerDay));
        formData.append('plateNumber', this.cardata.plateNumber);
        formData.append('available', String(this.cardata.available));
        formData.append('image', this.cardata.image);
        this.service.addCar(formData).subscribe(() => {
          this.carAdded.emit(true);
          this.router.navigate(['/cars']);
        });
      } else {
        //this.dialogRef.close(this.data);
        this.carAdded.emit(false);
        this.router.navigate(['/cars']);
      }
      this.dialogRef.close(this.cardata);
    });
  }

 
  // onSubmit() {
  //   const formData = new FormData();
  //  // formData.append('id', this.cardata.id);
  //   formData.append('name', this.cardata.name);
  //   formData.append('model', this.cardata.model);
  //   formData.append('makeyear', this.cardata.makeYear);
  //   formData.append('carType', this.cardata.carType);
  //   formData.append('color', this.cardata.color);
  //   formData.append('name', this.cardata.name);
  //   formData.append('model', this.cardata.model);
  //   formData.append('makeyear', this.cardata.makeYear);
  //   formData.append('image', this.cardata.image);
  
  //   this.http.post('/api/cars', formData).subscribe(
  //     () => {
  //       // Handle success
  //     },
  //     (error) => {
  //       // Handle error
  //     }
  //   );
  // }
  
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.cardata.image = file;
  }

}
