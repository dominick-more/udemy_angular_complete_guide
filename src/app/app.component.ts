import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public readonly genders: readonly string[] = ['male', 'female'];
  @Input() public defaultQuestion: string = 'teacher';
  @ViewChild('f') public signupForm: NgForm;
  public questionAnswer: string = '';
  public submitted: boolean = false;
  public user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };
  
  suggestUserName() {
    const suggestedName = 'Superuser';
  }

  onSubmit() {
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;
    this.signupForm.reset();
  }
  // onSubmit(ngForm: NgForm) {
  //   console.log(ngForm);
  // }
}
