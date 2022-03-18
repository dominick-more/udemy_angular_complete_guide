import { Component } from '@angular/core';
import RecipeService from './recipes/recipe.service';
import ShoppingListService from './shopping-list/shopping-list.service';
import AppTarget from './types/app-target';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ShoppingListService, RecipeService]
})
export class AppComponent {
  readonly title = 'udemy-angular-01';
  appTarget: AppTarget = 'recipes';

  onSelectAppTarget(appTarget: AppTarget) {
    this.appTarget = appTarget;
  }
}
