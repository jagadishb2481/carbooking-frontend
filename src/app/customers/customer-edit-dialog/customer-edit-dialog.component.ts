import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CarbookingService } from 'src/app/carbooking.service';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { Customer } from 'src/app/customer';

@Component({
  selector: 'app-customer-edit-dialog',
  templateUrl: './customer-edit-dialog.component.html',
  styleUrls: ['./customer-edit-dialog.component.css']
})
export class CustomerEditDialogComponent {

  constructor(public dialogRef: MatDialogRef<CustomerEditDialogComponent>, private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Customer, private service: CarbookingService, private router: Router) { }
  @Output() customerUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();
  userRole ='';
  ngOnInit(){
    let customerData = localStorage.getItem('customerdata');
    console.log("customerData:" + JSON.stringify(customerData));
    if (customerData) {
      const customer: Customer = JSON.parse(customerData);
      this.userRole = customer.role;
      console.log("role:" + this.userRole);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onUpdate(): void {
    console.log("updating cusomter details of id:" + this.data.id);
    const dialogref = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        message: `Are you sure you want to update the Customer of Id: ${this.data.id}?`
      }
    });
    dialogref.afterClosed().subscribe(result => {
      if (result) {
              this.service.updateCustomer(this.data).subscribe(() => {
          this.customerUpdated.emit(true);
        });
      } else {
        this.customerUpdated.emit(false);
        this.router.navigate(['/customers']);
      }
      this.dialogRef.close(this.data);
    });
  }
}
