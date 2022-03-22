import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Ingredient from '../types/ingredient.model';
import ShoppingListService from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  private ingredientsChangedSubscription: Subscription | undefined;
  public ingredients: Readonly<Ingredient>[] = [];

  constructor(private readonly shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientsChangedSubscription = this.shoppingListService.
      subscribeIngredientsChanged((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });
  }

  ngOnDestroy(): void {
    this.ingredientsChangedSubscription?.unsubscribe();
  }
}
