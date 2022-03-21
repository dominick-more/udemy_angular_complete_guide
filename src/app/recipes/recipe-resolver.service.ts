import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import Recipe from '../types/recipe.model';
import RecipeService from './recipe.service';

export const RecipeDataKey = 'recipe';

@Injectable()
export default class RecipeResolver implements Resolve<Readonly<Recipe> | undefined>{

  constructor(private readonly recipeService: RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Readonly<Recipe> | Observable<Readonly<Recipe> | undefined> | Promise<Readonly<Recipe> | undefined> | undefined {
    return this.recipeService.findRecipeById(route.params['id']);
  }
}
