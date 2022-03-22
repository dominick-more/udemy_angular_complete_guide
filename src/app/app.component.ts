import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public readonly subscriptions: readonly string[] = ['Basic', 'Advanced', 'Pro']; 
  @ViewChild('ngForm') public ngForm: NgForm;

  onSubmit() {
    this.ngForm.value;
  }
}
