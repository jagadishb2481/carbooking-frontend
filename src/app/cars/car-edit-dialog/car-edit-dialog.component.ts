import { Component, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Car } from 'src/app/car';
import { CarbookingService } from 'src/app/carbooking.service';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-car-edit-dialog',
  templateUrl: './car-edit-dialog.component.html',
  styleUrls: ['./car-edit-dialog.component.css']
})
export class CarEditDialogComponent {

  constructor(public dialogRef: MatDialogRef<CarEditDialogComponent>, private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Car, private service: CarbookingService, private router: Router) { }
  @Output() carUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();

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
        this.service.updateCar(this.data).subscribe(() => {
          this.carUpdated.emit(true);
        });
      } else {
        //this.dialogRef.close(this.data);
        this.carUpdated.emit(false);
        this.router.navigate(['/cars']);
      }
      this.dialogRef.close(this.data);
    });
  }
}