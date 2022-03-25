import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import Recipe from '../types/recipe.model';
import RecipeService from './recipe.service';

export const RecipeDataKey = 'recipe';

/**
 * Resolves the recipe identified as the url 'id' parameter or undefined.
 * @see {@link RecipeService}
 */
@Injectable()
export default class RecipeResolver implements Resolve<Readonly<Recipe> | undefined>{

  constructor(private readonly recipeService: RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Readonly<Recipe> | undefined {
    return this.recipeService.findItemById(route.params['id']);
  }
}
