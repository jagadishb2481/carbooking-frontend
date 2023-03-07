import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Car } from '../car';
import { FileHandle } from '../file-handle';

@Component({
  selector: 'app-show-image-dialog',
  templateUrl: './show-image-dialog.component.html',
  styleUrls: ['./show-image-dialog.component.css']
})
export class ShowImageDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(){
    this.receiveImages();
  }
  receiveImages(){
    console.log(this.data);
  }
}
