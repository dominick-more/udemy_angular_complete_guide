import { Component, Input, OnInit } from '@angular/core';
import Recipe from 'src/app/types/recipe.model';
import RecipeService from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe: Recipe | undefined = undefined;

  constructor(private readonly recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  onAddToShoppingList() {
    if (!this.recipe) {
      return;
    }
    this.recipeService.addIngredients(this.recipe.ingredients);
  }
}
