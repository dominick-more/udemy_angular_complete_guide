import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription, tap } from 'rxjs';
import { isNil, isNotBlank, mapRequiredWithId } from '../shared/app.utilities';
import DataStorageService from '../shared/storage/data-storage.service';
import Ingredient from '../types/ingredient.model';
import Recipe from '../types/recipe.model';
import { WithOptional, WithRequired } from '../types/type-script';

const deepCopyRecipe = (recipe: Readonly<Recipe>): Recipe => {
    return {...recipe, ingredients: recipe.ingredients.map<Ingredient>(mapRequiredWithId)};
};

const RecipeEdit: Readonly<WithOptional<Recipe, 'id'>> = Object.freeze({
    name: '',
    description: '',
    imagePath: '',
    ingredients: []
});
  
export const createEditableRecipe = (recipe?: Readonly<Recipe>): WithOptional<Recipe, 'id'> | Recipe => {
    return recipe !== undefined ? {...recipe, ingredients: recipe.ingredients.map<Ingredient>(mapRequiredWithId)} :
        {...RecipeEdit, ingredients: []};
};
  
/**
 * Provides the recipe list store and CRUD access.
 */
@Injectable()
export default class RecipeService {
    private readonly items: Readonly<Recipe>[] = [];
    private readonly collectionName = 'recipes';
    private readonly itemsUpdatedSubject = new Subject<Readonly<Recipe>[]>();

    constructor(private readonly dataStorage: DataStorageService) { }
    
    addItem(data: Readonly<WithOptional<Omit<Recipe, 'id'>, 'ingredients'>>): Readonly<Recipe> {
        const added = deepCopyRecipe(mapRequiredWithId<Recipe>({ingredients: [], ...data}));
        this.items.push(added);
        this.itemsUpdatedSubject.next(this.getItems());
        return added;
    }

    deleteItem(id?: string):  Readonly<Recipe> | undefined {
        const index = (id !== undefined) ? this.items.findIndex((recipe) => recipe.id === id) : -1;
        if(index === -1) {
            return undefined;
        }
        const deleted = this.items.splice(index, 1).shift();
        this.itemsUpdatedSubject.next(this.getItems());
        return deleted;
    }

    fetchItems(): Observable<Recipe[]> {
        return this.dataStorage.fetch<Recipe>(this.collectionName).pipe(
            tap((data) => {
                this.items.splice(0, this.items.length, ...data);
                this.itemsUpdatedSubject.next(this.getItems());
            })
        );
    }

    findItemById(id?: string): Readonly<Recipe> | undefined {
        return id !== undefined ?
            this.items.find((recipe) => recipe.id === id) : undefined;
    }

    getItems(): Readonly<Recipe>[] {
        return [...this.items];
    }

    isValidItem(recipe?: Readonly<Omit<Recipe, 'id'>>): boolean {
      return !isNil(recipe) && (isNotBlank(recipe.name) && isNotBlank(recipe.description) && isNotBlank(recipe.imagePath));
    }

    subscribeItemsChanged(next: (value: Readonly<Recipe>[]) => void): Subscription {
       return this.itemsUpdatedSubject.subscribe(next);
    }

    storeItems(): Observable<Recipe[]> {
        return this.dataStorage.store(this.collectionName, this.getItems()).pipe(
            tap((data) => {
                this.items.splice(0, this.items.length, ...data);
                this.itemsUpdatedSubject.next(this.getItems());
            })
        );
    }

    updateItem(data: Readonly<WithRequired<Partial<Recipe>, 'id'>>): Readonly<Recipe> | undefined {
        const index = this.items.findIndex((recipe: Readonly<Recipe>) => recipe.id === data.id);
        if (index !== -1) {
            const updated = deepCopyRecipe({...this.items[index], ...data});
            this.items[index] = updated;
            this.itemsUpdatedSubject.next(this.getItems());
            return updated;
        }
        return undefined;
    }
}