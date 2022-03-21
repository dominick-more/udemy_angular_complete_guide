import { EventEmitter, Injectable } from '@angular/core';
import { v4 as generateId } from 'uuid';
import Ingredient from '../types/ingredient.model';

@Injectable()
export default class ShoppingListService {
    
  readonly ingredientsChangedEmitter = new EventEmitter<Readonly<Ingredient>[]>();

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
    this.ingredientsChangedEmitter.emit(this.getIngredients());
  }

  addIngredients(items: Readonly<Omit<Ingredient, 'id'>>[]) {
    if (!items.length) {
      return;
    }
    this.ingredients.push(...items.map((item) => ({...item, id: generateId()})));
    this.ingredientsChangedEmitter.emit(this.getIngredients());
  }

  getIngredients(): Readonly<Ingredient>[] {
    return [...this.ingredients];
  }
}