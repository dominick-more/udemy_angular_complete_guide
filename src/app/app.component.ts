import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public readonly subscriptionOptionValues: readonly string[] = ['Basic', 'Advanced', 'Pro']; 
  public selectedSubscription: string = 'Advanced';
  public submitted: boolean = false;
  public submittedData: Record<string, string> = {
    email: '',
    subscription: '',
    password: ''
  };
  @ViewChild('f') public ngForm: NgForm;

  onSubmit() {
    this.submittedData.email = this.ngForm.value.email;
    this.submittedData.subscription = this.ngForm.value.subscription;
    this.submittedData.password = this.ngForm.value.password;
    console.log(this.ngForm.value);
    this.ngForm.reset();
    this.submitted = true;
  }
}
