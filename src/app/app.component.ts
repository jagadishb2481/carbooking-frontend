import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { map, Observable, BehaviorSubject  } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'carbooking-frontend';
  public isAuthenticated = false;
  constructor(private authService:AuthService) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isLoggedIn();
  }

}
