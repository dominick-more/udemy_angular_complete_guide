import { EventEmitter, Injectable } from '@angular/core';
import { v4 as generateId } from 'uuid';
import { isNil, isNotBlank } from '../shared/app.utilities';
import ShoppingListService from '../shopping-list/shopping-list.service';
import Ingredient from '../types/ingredient.model';
import Recipe from '../types/recipe.model';

const deepCopyRecipe = (recipe: Readonly<Recipe>): Recipe => {
    return {...recipe, ingredients: recipe.ingredients};
};

/**
 * Provides the recipe list store and CRUD access.
 */
@Injectable()
export default class RecipeService {
    private readonly recipes: Readonly<Recipe>[] = [
        {
            id: generateId(),
            name: 'Tasty Schnitzel',
            description: 'A super-tasty Schnitzel - just awesome?',
            imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Schnitzel.JPG/640px-Schnitzel.JPG',
            ingredients: [
                {id: generateId(), name: 'Meat', amount: 1},
                {id: generateId(), name: 'French Fried', amount: 20}
            ]
        },
        {
            id: generateId(),
            name: 'Big Fat Burger',
            description: 'What else you need to say?',
            imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg/640px-Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
            ingredients: [
                {id: generateId(), name: 'Meat', amount: 1},
                {id: generateId(), name: 'Buns', amount: 2}
            ]
        }
    ];
    readonly recipesUpdatedEmitter = new EventEmitter<Readonly<Recipe>[]>();

    constructor(private readonly shoppingListService: ShoppingListService) { }
    
    addIngredients(items: Readonly<Omit<Ingredient, 'id'>>[]) {
        this.shoppingListService.addIngredients(items);
    }

    addRecipe(data: Omit<Readonly<Recipe>, 'id'>): Readonly<Recipe> {
        const added = deepCopyRecipe({...data, id: generateId()});
        this.recipes.push(added);
        this.recipesUpdatedEmitter.emit(this.getRecipes());
        return added;
    }

    deleteRecipe(id?: string):  Readonly<Recipe> | undefined {
        const index = (id !== undefined) ? this.recipes.findIndex((recipe) => recipe.id === id) : -1;
        if(index === -1) {
            return undefined;
        }
        const deleted = this.recipes.splice(index, 1).shift();
        this.recipesUpdatedEmitter.emit(this.getRecipes());
        return deleted;
    }

    findRecipeById(id?: string): Readonly<Recipe> | undefined {
        return id !== undefined ?
            this.recipes.find((recipe) => recipe.id === id) : undefined;
    }

    getRecipes(): Readonly<Recipe>[] {
        return [...this.recipes];
    }

    isValidRecipe(recipe?: Omit<Readonly<Recipe>, 'id'>): boolean {
      return !isNil(recipe) && (isNotBlank(recipe.name) && isNotBlank(recipe.description) && isNotBlank(recipe.imagePath));
    }

    updateRecipe(data: Readonly<Recipe>): Readonly<Recipe> | undefined {
        const index = this.recipes.findIndex((recipe: Readonly<Recipe>) => recipe.id === data.id);
        if (index !== -1) {
            const updated = deepCopyRecipe(data);
            this.recipes[index] = updated;
            this.recipesUpdatedEmitter.emit(this.getRecipes());
            return updated;
        }
        return undefined;
    }
}