import { Component, Input } from '@angular/core';
import Recipe from 'src/app/types/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {

  @Input() recipe: Readonly<Recipe> | undefined = undefined;

  constructor() { }
}
