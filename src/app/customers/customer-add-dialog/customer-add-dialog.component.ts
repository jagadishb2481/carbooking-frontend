import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Customer } from 'src/app/customer';
import { CarbookingService } from 'src/app/carbooking.service';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-customer-add-dialog',
  templateUrl: './customer-add-dialog.component.html',
  styleUrls: ['./customer-add-dialog.component.css']
})
export class CustomerAddDialogComponent {
  constructor(public dialogRef: MatDialogRef<CustomerAddDialogComponent>, private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Customer, private service: CarbookingService, private router: Router) { }
  @Output() customerAdded: EventEmitter<boolean> = new EventEmitter<boolean>();

  customerdata : Customer = new Customer();
  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    //console.log("updating customer details of id:" + this.data.id);
    const dialogref = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        message: `Are you sure you want to Add this Customer ?`
      }
    });
    dialogref.afterClosed().subscribe(result => {
      if (result) {
                this.service.addCustomer(this.customerdata).subscribe(() => {
          this.customerAdded.emit(true);
          this.router.navigate(['/customers']);
        });
      } else {
        //this.dialogRef.close(this.data);
        this.customerAdded.emit(false);
        this.router.navigate(['/customers']);
      }
      this.dialogRef.close(this.customerdata);
    });
  }
}
