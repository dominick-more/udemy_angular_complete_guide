import { EventEmitter, Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import Ingredient from '../types/ingredient.model';

@Injectable()
export default class ShoppingListService {
    
  readonly ingredientsChangedEmitter = new EventEmitter<Readonly<Ingredient>[]>();

  private readonly ingredients: Readonly<Ingredient>[] = [
      {
        id: uuidv4(),
        name: 'Apples',
        amount: 5
      },
      {
        id: uuidv4(),
        name: 'Tomatoes',
        amount: 10
      }
  ];

  addIngredient(item: Readonly<Omit<Ingredient, 'id'>>) {
    this.ingredients.push({...item, id: uuidv4()});
    this.ingredientsChangedEmitter.emit(this.getIngredients());
  }

  addIngredients(items: Readonly<Omit<Ingredient, 'id'>>[]) {
    if (!items.length) {
      return;
    }
    this.ingredients.push(...items.map((item) => ({...item, id: uuidv4()})));
    this.ingredientsChangedEmitter.emit(this.getIngredients());
  }

  getIngredients(): Readonly<Ingredient>[] {
    return [...this.ingredients];
  }
}