import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import Ingredient from '../types/ingredient.model';
import ShoppingListService from './shopping-list.service';

export const IngredientDataKey = 'ingredient';

@Injectable()
export default class IngredientResolver implements Resolve<Readonly<Ingredient>|undefined> {
    
    constructor(private readonly shoppingListService: ShoppingListService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Readonly<Ingredient> | undefined {
        return this.shoppingListService.findItemById(route.params['id']);
    }

}