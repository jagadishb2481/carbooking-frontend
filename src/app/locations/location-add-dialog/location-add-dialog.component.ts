import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CarbookingService } from 'src/app/carbooking.service';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { Location } from '../location';

@Component({
  selector: 'app-location-add-dialog',
  templateUrl: './location-add-dialog.component.html',
  styleUrls: ['./location-add-dialog.component.css']
})
export class LocationAddDialogComponent {


  constructor(public dialogRef: MatDialogRef<LocationAddDialogComponent>, private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Location, private service: CarbookingService, private router: Router) { }
  @Output() locationAdded: EventEmitter<boolean> = new EventEmitter<boolean>();

  locationdata: Location = new Location();
  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    //console.log("updating location details of id:" + this.data.id);
    const dialogref = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        message: `Are you sure you want to Add this Location ?`
      }
    });
    dialogref.afterClosed().subscribe(result => {
      if (result) {
        this.service.addLocation(this.locationdata).subscribe(() => {
          this.locationAdded.emit(true);
          this.router.navigate(['/locations']);
        });
      } else {
        //this.dialogRef.close(this.data);
        this.locationAdded.emit(false);
        this.router.navigate(['/locations']);
      }
      this.dialogRef.close(this.locationdata);
    });
  }


}
