import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Recipe from '../types/recipe.model';
import RecipeService from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {

  private recipeSelectedSubscription: Subscription | undefined; 
  public selectedRecipe: Recipe | undefined;

  constructor(private readonly recipeService: RecipeService) { }
  
  ngOnInit(): void {
    this.recipeSelectedSubscription = this.recipeService.
      recipeSelectedEmitter.subscribe(
      (id?: string) => {
        this.selectedRecipe = this.recipeService.findRecipeById(id);
      });
  }

  ngOnDestroy(): void {
    this.recipeSelectedSubscription?.unsubscribe();
  }
}
