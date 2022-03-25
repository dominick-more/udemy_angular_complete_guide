import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { getDefaultIfNil, isNotBlank, isTypeWithId } from '../../shared/app.utilities';
import CanDeactivateCheck from '../../types/can-deactivate-check';
import { WithOptional } from '../../types/type-script';
import Recipe from '../../types/recipe.model';
import RecipeService, { createEditableRecipe } from '../recipe.service';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import Ingredient from 'src/app/types/ingredient.model';
import { createEditableIngredient } from 'src/app/shopping-list/shopping-list.service';

const NavigatePath = Object.freeze(['..']);

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy, CanDeactivateCheck {
  private routeParamsSubscription: Subscription | undefined;
  private id: string | undefined;
  private cancel: boolean = false;
  public recipeForm: FormGroup;
  
  constructor(private readonly recipeService: RecipeService,
    private readonly route: ActivatedRoute,
    private readonly router: Router) { }

  mapIngredientsToFormGroups(ingredients: Readonly<Ingredient | WithOptional<Ingredient, "id">>[]): FormGroup[] {
    return ingredients.map((ingredient) => {
      return new FormGroup({
        'id': new FormControl(isNotBlank(ingredient.id) ? ingredient.id : null),
        'name': new FormControl(isNotBlank(ingredient.name) ? ingredient.name : null, Validators.required),
        'amount': new FormControl(ingredient.amount, [Validators.required, Validators.min(1)])
      });
    })
  }

  ngOnInit(): void {
    const recipe = createEditableRecipe(this.recipeService.findItemById(this.route.params['id']));
    this.id = recipe.id;
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipe.name, Validators.required),
      'description': new FormControl(recipe.description, Validators.required),
      'imagePath': new FormControl(recipe.imagePath, Validators.required),
      'ingredients': new FormArray(this.mapIngredientsToFormGroups(recipe.ingredients))
    }); 
    this.routeParamsSubscription = this.route.params.subscribe((params: Params) => {
      const recipe = createEditableRecipe(this.recipeService.findItemById(params['id']));
      this.id = recipe.id;
      this.recipeForm.patchValue({
        'name': recipe.name,
        'description': recipe.description,
        'imagePath': recipe.imagePath
      });
      const ingredientsArray = <FormArray>this.recipeForm.get('ingredients');
      ingredientsArray.clear();
      this.mapIngredientsToFormGroups(recipe.ingredients).forEach(
        (formGroup) => ingredientsArray.push(formGroup));
    });
  }

  ngOnDestroy(): void {
    this.routeParamsSubscription?.unsubscribe();
  }

  canDeactivate(): boolean {
    return this.cancel || this.isNew() || this.isValid();
  }

  getIngredientControls(): AbstractControl[] {
    const ingredientsArray = <FormArray>this.recipeForm.get('ingredients');
    return ingredientsArray.controls;
  }
  
  isNew(): boolean {
    return this.id === undefined;
  }

  isValid(): boolean {
    return this.recipeForm.valid;
  }

  onAddIngredient(): void {
    const ingredientsArray = <FormArray>this.recipeForm.get('ingredients');
    this.mapIngredientsToFormGroups([createEditableIngredient()]).forEach(
      (formGroup) => ingredientsArray.push(formGroup));
  }

  onRemoveIngredient(index: number): void {
    const ingredientsArray = <FormArray>this.recipeForm.get('ingredients');
    ingredientsArray.removeAt(index);
  }

  onCancel(): void {
    this.cancel = true;
    this.router.navigate([...NavigatePath], {relativeTo: this.route});
  }

  onSave(): void {
    const recipeValue = this.recipeForm.value;
    const recipe : WithOptional<Recipe, 'id' | 'ingredients'> = {
      'id': this.id,
      'name': getDefaultIfNil(recipeValue.name, ''),
      'description': getDefaultIfNil(recipeValue.description, ''),
      'imagePath': getDefaultIfNil(recipeValue.imagePath, ''),
      'ingredients': recipeValue.ingredients
    };

    if (isTypeWithId(recipe)) {
      this.recipeService.updateItem(recipe);
    } else {
      this.recipeService.addItem(recipe);
    }
    this.router.navigate([...NavigatePath], {relativeTo: this.route});
  }
}

