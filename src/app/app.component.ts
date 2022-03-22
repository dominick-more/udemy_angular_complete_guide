import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private readonly forbiddenUsernames: ReadonlyArray<string> = ['Anna', 'Chris'];
  public readonly genders: ReadonlyArray<string> = ['male', 'female'];
  public signupForm: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null,
          [Validators.required, this.validateForbiddenNames.bind(this)]),
        'email': new FormControl(null,
          [Validators.required, Validators.email],
          this.asyncValidateForbiddenEmails.bind(this))
      }),
      'gender': new FormControl('male', Validators.required),
      'hobbies': new FormArray([])
    });
    this.signupForm.valueChanges.subscribe(
      (value) => console.log('Value changed: ' + JSON.stringify(value)));
    this.signupForm.statusChanges.subscribe(
      (status) => console.log('Status changed: ' + status));
    this.signupForm.setValue({
        'userData': {
          'username': 'Lady',
          'email': 'lady@test.com'
        },
        'gender': 'female',
        'hobbies': []
      });
  }
  
  getHobbyControls(): AbstractControl[] {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  onAddHobby(): void {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  onSubmit(): void {
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  validateForbiddenNames(control: AbstractControl): ValidationErrors | null {
    if(this.forbiddenUsernames.includes(control.value)) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  asyncValidateForbiddenEmails(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
  }
}
