import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CarbookingService } from 'src/app/carbooking.service';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { Location } from '../location';

@Component({
  selector: 'app-location-edit-dialog',
  templateUrl: './location-edit-dialog.component.html',
  styleUrls: ['./location-edit-dialog.component.css']
})
export class LocationEditDialogComponent {


  constructor(public dialogRef: MatDialogRef<LocationEditDialogComponent>, private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Location, private service: CarbookingService, private router: Router) { }
  @Output() locationUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();
  userRole = '';
  ngOnInit() {

  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onUpdate(): void {
    console.log("updating location details of id:" + this.data.id);
    const dialogref = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        message: `Are you sure you want to update the Location of Id: ${this.data.id}?`
      }
    });
    dialogref.afterClosed().subscribe(result => {
      if (result) {
        this.service.updateLocation(this.data).subscribe(() => {
          this.locationUpdated.emit(true);
        });
      } else {

        this.locationUpdated.emit(false);
        this.router.navigate(['/locations']);
      }
      this.dialogRef.close(this.data);
    });
  }


}
