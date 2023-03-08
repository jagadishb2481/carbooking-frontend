import { Component , ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CarbookingService } from 'src/app/carbooking.service';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { Location } from '../location';
import { LocationAddDialogComponent } from '../location-add-dialog/location-add-dialog.component';
import { LocationEditDialogComponent } from '../location-edit-dialog/location-edit-dialog.component';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent {
  locations: Location[] = [];
 
  displayedColumns: string[] = ['id', 'name', 'address', 'city', 'state', 'country', 'zipcode', 'actions'];
  dataSource = new MatTableDataSource<Location>();
  filterValue: string = '';
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  pageSize = 5;
  constructor(private carbookingService: CarbookingService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllLocations();
  }

  getAllLocations() {
    this.carbookingService.getAllLocations().subscribe(data => {
      this.locations = data;
      
      this.dataSource = new MatTableDataSource(this.locations);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      // console.log(JSON.stringify(this.dataSource));
    });
  }

  deleteLocation(id: number) {
    if (confirm(`Are you sure you want to delete the Car with id: ${id}?`)) {
      this.carbookingService.deleteCar(id).subscribe(() => {
        this.locations = this.locations.filter(location => location.id !== id);
      });
    }
  }

  applyFilter(event: Event) {
    console.log("inside filter");
    this.filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  openEditDialog(location: Location): void {
    const dialogRef = this.dialog.open(LocationEditDialogComponent, {
      width: '350px',
      data: location
    });
    dialogRef.afterClosed().subscribe(result => {
      if (dialogRef.componentInstance.locationUpdated) {
        this.getAllLocations();
      }
      else if (result) {
        const index = this.dataSource.data.indexOf(location);
        this.dataSource.data[index] = result;
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  openDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '490px',
      data: {
        message: `Are you sure you want to delete the location with id:${id} ?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Call your service here to delete the location data
        this.carbookingService.deleteLocation(id).subscribe(() => {
          this.locations = this.locations.filter(location => location.id !== id);
          this.dataSource = new MatTableDataSource(this.locations);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
      }
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(LocationAddDialogComponent, {
      width: '400px',
      data: ''
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.getAllLocations();
    });
  }




}
