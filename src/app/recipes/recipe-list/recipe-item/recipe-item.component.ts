import { Component, Input, OnInit } from '@angular/core';
import Recipe from 'src/app/types/recipe.model';
import RecipeService from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Readonly<Recipe> | undefined = undefined;

  constructor(private readonly recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  onClickRecipe() {
    this.recipeService.selectRecipe(this.recipe?.id);
  }
}
