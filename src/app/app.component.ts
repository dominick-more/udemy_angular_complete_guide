import { Component } from '@angular/core';
import AppTarget from './types/app-target';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly title = 'udemy-angular-01';
  appTarget: AppTarget = 'recipes';

  onSelectAppTarget(appTarget: AppTarget) {
    this.appTarget = appTarget;
  }
}
