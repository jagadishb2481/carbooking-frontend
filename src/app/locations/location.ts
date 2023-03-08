
export class Location {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipcode: string

  constructor() {
    // Initialization inside the constructor
    this.id = 0;
    this.name = '';
    this.address = '';
    this.city = '';
    this.state = '';
    this.country = '';
    this.zipcode = '';
  }

}

