import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  @ViewChild('authForm') private authForm: NgForm;
  public isLoading: boolean = false;
  public isLoginMode: boolean = true;
  public errorMessage: string | null = null;

  constructor(private readonly authService: AuthService,
    private readonly router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }
    const { email, password } = this.authForm.value;
    const creds = {email, password};
    this.isLoading = true;
    
    const authObs: Observable<void> = this.isLoginMode ?
      this.authService.login(creds) : this.authService.register(creds);
    authObs.subscribe({
      next: (): void => {
        this.isLoading = false;
        this.errorMessage = null;
        this.router.navigate(['/recipes']);
      },
      error: (error: Error): void => {
        this.isLoading = false;
        this.errorMessage = error.message;
        console.warn('Auth error is: ' + error);
      }
    });
  }
}
