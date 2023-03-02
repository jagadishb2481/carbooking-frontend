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
        this.service.addCar(this.cardata).subscribe(() => {
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

}
