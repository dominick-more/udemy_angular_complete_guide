import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    RouterModule.forChild([{path: '', component: AuthComponent}]),
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [RouterModule],
})
export class AuthModule { }
