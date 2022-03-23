import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { v4 as generateId } from 'uuid';
import Ingredient from '../types/ingredient.model';
import { WithOptional } from '../types/type-script';

const deepCopyIngredient = (ingredient: Readonly<Ingredient>): Ingredient => {
  return {...ingredient};
};

const IngredientEdit: Readonly<WithOptional<Ingredient, 'id'>> = Object.freeze({
  name: '',
  amount: 1
});

export const createEditableIngredient = (ingredient?: Readonly<Ingredient>): WithOptional<Ingredient, 'id'> | Ingredient => {
  return ingredient !== undefined ? {...ingredient} : {...IngredientEdit};
};

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

  addIngredient(item: Readonly<Omit<Ingredient, 'id'>>): Readonly<Ingredient> {
    const added = deepCopyIngredient({...item, id: generateId()});
    this.ingredients.push(added);
    this.ingredientsChangedSubject.next(this.getIngredients());
    return added;
  }

  addIngredients(items: Readonly<Omit<Ingredient, 'id'>>[]): Readonly<Ingredient>[] {
    if (!items.length) {
      return [];
    }
    const added = items.map((item) => deepCopyIngredient({...item, id: generateId()}));
    this.ingredients.push(...added);
    this.ingredientsChangedSubject.next(this.getIngredients());
    return added;
  }

  deleteIngredient(id?: string):  Readonly<Ingredient> | undefined {
    const index = (id !== undefined) ? this.ingredients.findIndex(
      (ingredient) => ingredient.id === id) : -1;
    if(index === -1) {
        return undefined;
    }
    const deleted = this.ingredients.splice(index, 1).shift();
    this.ingredientsChangedSubject.next(this.getIngredients());
    return deleted;
}

  findIngredientById(id?: string): Readonly<Ingredient> | undefined {
    return id !== undefined ?
        this.ingredients.find((ingredient) => ingredient.id === id) : undefined;
  }

  getIngredients(): Readonly<Ingredient>[] {
    return [...this.ingredients];
  }

  updateIngredient(data: Readonly<Ingredient>): Readonly<Ingredient> | undefined {
    const index = this.ingredients.findIndex((ingredient: Readonly<Ingredient>) => ingredient.id === data.id);
    if (index !== -1) {
        const updated = deepCopyIngredient(data);
        this.ingredients[index] = updated;
        this.ingredientsChangedSubject.next(this.getIngredients());
        return updated;
    }
    return undefined;
  }

  subscribeIngredientsChanged(observer: (value: Readonly<Ingredient>[]) => void): Subscription {
    return this.ingredientsChangedSubject.subscribe(observer);
  }
}