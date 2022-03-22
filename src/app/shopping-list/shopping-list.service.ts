import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { v4 as generateId } from 'uuid';
import Ingredient from '../types/ingredient.model';

@Injectable()
export default class ShoppingListService {
    
  private readonly ingredientsChangedSubject = new Subject<Readonly<Ingredient>[]>();

  private readonly ingredients: Readonly<Ingredient>[] = [
      {
        id: generateId(),
        name: 'Apples',
        amount: 5
      },
      {
        id: generateId(),
        name: 'Tomatoes',
        amount: 10
      }
  ];

  addIngredient(item: Readonly<Omit<Ingredient, 'id'>>) {
    this.ingredients.push({...item, id: generateId()});
    this.ingredientsChangedSubject.next(this.getIngredients());
  }

  addIngredients(items: Readonly<Omit<Ingredient, 'id'>>[]) {
    if (!items.length) {
      return;
    }
    this.ingredients.push(...items.map((item) => ({...item, id: generateId()})));
    this.ingredientsChangedSubject.next(this.getIngredients());
  }

  getIngredients(): Readonly<Ingredient>[] {
    return [...this.ingredients];
  }

  subscribeIngredientsChanged(observer: (value: Readonly<Ingredient>[]) => void): Subscription {
    return this.ingredientsChangedSubject.subscribe(observer);
  }
}