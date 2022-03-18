import { Component, OnInit } from '@angular/core';
import Recipe from 'src/app/types/recipe.model';
import RecipeService from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  public recipes: Readonly<Recipe>[] = [];
  
  constructor(private readonly recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }
}
