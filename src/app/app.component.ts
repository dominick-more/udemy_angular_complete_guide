import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {
  readonly title = 'udemy-angular-01';

  constructor(private readonly authService: AuthService) {}
  
  ngOnInit(): void {
    this.authService.autoLogin();
  }
  
}
