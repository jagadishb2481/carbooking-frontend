import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Car } from './car';
import { FileHandle } from './file-handle';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  
  constructor(private sanitizer:DomSanitizer) { }
  
  public createImage(car: Car){
    const carImage = car.image;
    const imgsToFileHandle:FileHandle[]=[];
    const carImageType = 'image/jpg'
    let imageBlob = this.dataURItoBlob(carImage, carImageType);
    const imageFile = new File([imageBlob], car.model , {type:carImageType});
    const finalFileHandle : FileHandle = {
      file:imageFile,
      url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
    };
    car.image = finalFileHandle;
    return car;
  }

  dataURItoBlob(picBytes:any, imageType:any){
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for(let i=0;i<byteString.length;i++){
      int8Array[i]=byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], {type:imageType});
    return blob;

  }


}
