import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CarbookingService } from 'src/app/carbooking.service';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { Customer } from 'src/app/customer';
import { CustomerAddDialogComponent } from '../customer-add-dialog/customer-add-dialog.component';
import { CustomerEditDialogComponent } from '../customer-edit-dialog/customer-edit-dialog.component';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent {

  customers: Customer[] = [];
  //showEditForm: boolean = false;
  //selectedCar: Car | null = null;

  displayedColumns: string[] = ['id', 'name', 'email', 'username', 'password', 'address', 'role', 'actions'];
  dataSource = new MatTableDataSource<Customer>();
  filterValue: string = '';
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  pageSize = 5;
  constructor(private carbookingService: CarbookingService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getCustomersList();
  }

  getCustomersList() {
    this.carbookingService.getCustomers().subscribe(data => {
      this.customers = data;
      
      this.dataSource = new MatTableDataSource(this.customers);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      // console.log(JSON.stringify(this.dataSource));
    });
  }

  deleteCustomer(id: number) {
    if (confirm(`Are you sure you want to delete the Car with id: ${id}?`)) {
      this.carbookingService.deleteCar(id).subscribe(() => {
        this.customers = this.customers.filter(customer => customer.id !== id);
      });
    }
  }

  applyFilter(event: Event) {
    console.log("inside filter");
    this.filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  openEditDialog(customer: Customer): void {
    const dialogRef = this.dialog.open(CustomerEditDialogComponent, {
      width: '350px',
      data: customer
    });
    dialogRef.afterClosed().subscribe(result => {
      if (dialogRef.componentInstance.customerUpdated) {
        this.getCustomersList();
      }
      else if (result) {
        const index = this.dataSource.data.indexOf(customer);
        this.dataSource.data[index] = result;
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  openDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '490px',
      data: {
        message: `Are you sure you want to delete the customer with id:${id} ?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Call your service here to delete the customer data
        this.carbookingService.deleteCustomer(id).subscribe(() => {
          this.customers = this.customers.filter(customer => customer.id !== id);
          this.dataSource = new MatTableDataSource(this.customers);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
      }
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(CustomerAddDialogComponent, {
      width: '400px',
      data: ''
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.getCustomersList();
    });
  }



}
