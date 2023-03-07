import { SafeUrl } from "@angular/platform-browser";

export class Car {
    id: number;
    name: string;
    model: string;
    makeYear:string;
    carType:string;
    plateNumber:string;
    pricePerDay:number;
    available:boolean;
    availabilityStatus:string;
    color:string;
    editing:boolean;
    image:any;
    imageurl:SafeUrl;
    constructor() { 
      // Initialization inside the constructor
      this.id=0;
      this.model='';
      this.makeYear='';
      this.carType='';
      this.plateNumber='';
      this.name='';
      this.pricePerDay=0;
      this.available=true;
      this.color='';
      this.editing=false;
      this.availabilityStatus='';
      this.imageurl='';
   }

  }

 