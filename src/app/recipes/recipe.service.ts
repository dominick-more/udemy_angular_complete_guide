import { EventEmitter, Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import ShoppingListService from '../shopping-list/shopping-list.service';
import Ingredient from '../types/ingredient.model';
import Recipe from '../types/recipe.model';

@Injectable()
export default class RecipeService {
    private readonly recipes: Readonly<Recipe>[] = [
        {
            id: uuidv4(),
            name: 'Tasty Schnitzel',
            description: 'A super-tasty Schnitzel - just awesome?',
            imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Schnitzel.JPG/640px-Schnitzel.JPG',
            ingredients: [
                {id: uuidv4(), name: 'Meat', amount: 1},
                {id: uuidv4(), name: 'French Fried', amount: 20}
            ]
        },
        {
            id: uuidv4(),
            name: 'Big Fat Burger',
            description: 'What else you need to say?',
            imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg/640px-Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
            ingredients: [
                {id: uuidv4(), name: 'Meat', amount: 1},
                {id: uuidv4(), name: 'Buns', amount: 2}
            ]
        }
    ];
    readonly recipeSelectedEmitter = new EventEmitter<string| undefined>();

    constructor(private readonly shoppingListService: ShoppingListService) { }
    
    addIngredients(items: Readonly<Omit<Ingredient, 'id'>>[]) {
        this.shoppingListService.addIngredients(items);
    }

    findRecipeById(id?: string): Readonly<Recipe> | undefined {
        return id !== undefined ?
            this.recipes.find((recipe) => recipe.id === id) : undefined;
    }
    getRecipes(): Readonly<Recipe>[] {
        return [...this.recipes];
    }

    selectRecipe(id?: string): void {
        this.recipeSelectedEmitter.emit(id);
    }
}