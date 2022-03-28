import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/directives/placeholder.directive';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild('authForm') private authForm: NgForm;
  @ViewChild(PlaceholderDirective) private alertHost: PlaceholderDirective;
  private alertCloseSubscription: Subscription | undefined;
  public isLoading: boolean = false;
  public isLoginMode: boolean = true;
  public errorMessage: string | null = null;
  public errorModalDisplayed: boolean = false;
  
  constructor(private readonly authService: AuthService,
    private readonly router: Router) { }
  
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.alertCloseSubscription) {
      this.alertCloseSubscription.unsubscribe();
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onToggleErrorModalDisplayed() {
    this.errorMessage = null;
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
        this.showErrorAlert(this.errorMessage);
        console.debug('Auth error is: ' + error);
      }
    });
  }

  showErrorAlert(message: string) {
    const viewContainerRef = this.alertHost.viewContainerRef;
    viewContainerRef.clear();
    const alertComponentRef = viewContainerRef.createComponent(AlertComponent);
    alertComponentRef.instance.message = message;
    this.alertCloseSubscription = alertComponentRef.instance.closeEvent.subscribe(() => {
      this.alertCloseSubscription?.unsubscribe();
      this.alertCloseSubscription = undefined;
      viewContainerRef.clear();
      this.onToggleErrorModalDisplayed();
    });
      
  }
}
