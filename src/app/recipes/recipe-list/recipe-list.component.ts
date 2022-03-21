import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Recipe from 'src/app/types/recipe.model';
import RecipeService from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private recipesUpdatedSubscription: Subscription | undefined;
  public recipes: Readonly<Recipe>[] = [];
  
  constructor(private readonly recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipesUpdatedSubscription = this.recipeService.recipesUpdatedEmitter.
      subscribe((recipes: Readonly<Recipe>[]) => this.recipes = recipes);
  }

  ngOnDestroy(): void {
    this.recipesUpdatedSubscription?.unsubscribe();
  }
}
