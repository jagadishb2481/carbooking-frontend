
export class Customer {
    id: number;
    name: string;
    email: string;
    username:string;
    password:string;
    confirmPassword:string;
    address: string
    phoneNumber:string;
    role:string;
    constructor() { 
      // Initialization inside the constructor
      this.id=0;
      this.email='';
      this.username='';
      this.password='';
      this.address='';
      this.name='';
      this.phoneNumber='';
      this.role='';
      this.confirmPassword='';
   }

  }

 