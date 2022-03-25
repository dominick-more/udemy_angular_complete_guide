import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { mapRequiredWithId } from '../shared/app.utilities';
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
  private readonly itemsChangedSubject = new Subject<Readonly<Ingredient>[]>();
  private readonly items: Readonly<Ingredient>[] = [];

  addItem(item: Readonly<Omit<Ingredient, 'id'>>): Readonly<Ingredient> {
    const added = deepCopyIngredient(mapRequiredWithId(item));
    this.items.push(added);
    this.itemsChangedSubject.next(this.getItems());
    return added;
  }

  addItems(items: Readonly<Omit<Ingredient, 'id'>>[]): Readonly<Ingredient>[] {
    if (!items.length) {
      return [];
    }
    const added = items.map((item) => deepCopyIngredient(mapRequiredWithId(item)));
    this.items.push(...added);
    this.itemsChangedSubject.next(this.getItems());
    return added;
  }

  deleteItem(id?: string):  Readonly<Ingredient> | undefined {
    const index = (id !== undefined) ? this.items.findIndex(
      (ingredient) => ingredient.id === id) : -1;
    if(index === -1) {
        return undefined;
    }
    const deleted = this.items.splice(index, 1).shift();
    this.itemsChangedSubject.next(this.getItems());
    return deleted;
}

  findItemById(id?: string): Readonly<Ingredient> | undefined {
    return id !== undefined ?
        this.items.find((ingredient) => ingredient.id === id) : undefined;
  }

  getItems(): Readonly<Ingredient>[] {
    return [...this.items];
  }

  updateItem(item: Readonly<Ingredient>): Readonly<Ingredient> | undefined {
    const index = this.items.findIndex((ingredient: Readonly<Ingredient>) => ingredient.id === item.id);
    if (index !== -1) {
        const updated = deepCopyIngredient(item);
        this.items[index] = updated;
        this.itemsChangedSubject.next(this.getItems());
        return updated;
    }
    return undefined;
  }

  subscribeItemsChanged(next: (value: Readonly<Ingredient>[]) => void): Subscription {
    return this.itemsChangedSubject.subscribe(next);
  }
}