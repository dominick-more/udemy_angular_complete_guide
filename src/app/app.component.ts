import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import CustomValidators from './shared/custom-validators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private readonly forbiddenNamePattern: RegExp = /^\s*Test\s*$/;
  public readonly statusesOptions: ReadonlyArray<string> = ['Stable', 'Critical', 'Finished'];
  public projectForm: FormGroup;

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      'name': new FormControl(null, Validators.required,
        CustomValidators.createAsyncPatternMatchValidator({
          pattern: this.forbiddenNamePattern,
          validationKey: 'nameIsForbidden',
          timeout: 1500
        })
      ),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl(null, Validators.required)
    });
  }

  onSubmit(): void {
    console.log(this.projectForm.value); 
  }
}
