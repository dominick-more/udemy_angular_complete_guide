import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { isNotBlank, isTypeWithId } from '../../shared/app.utilities';
import CanDeactivateCheck from '../../types/can-deactivate-check';
import { WithOptional } from '../../types/type-script';
import Recipe from '../../types/recipe.model';
import { RecipeDataKey } from '../recipe-resolver.service';
import RecipeService from '../recipe.service';

const NavigatePath = Object.freeze(['/..']);
const RecipeEdit: Readonly<WithOptional<Recipe, 'id'>> = Object.freeze({
  name: '',
  description: '',
  imagePath: '',
  ingredients: []
});

const createEditableRecipe = (recipe?: Readonly<Recipe>): WithOptional<Recipe, 'id'> | Recipe => {
  return recipe !== undefined ? {...recipe} : {...RecipeEdit, ingredients: []};
};

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy, CanDeactivateCheck {
  private routeDataSubscription: Subscription | undefined;
  private cancel: boolean = false;
  public recipe: WithOptional<Recipe, 'id'> | Recipe = createEditableRecipe();
  
  constructor(private readonly recipeService: RecipeService,
    private readonly route: ActivatedRoute,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.routeDataSubscription = this.route.data.subscribe((data: Data) => {
      this.recipe = createEditableRecipe(data[RecipeDataKey]);
    });
  }

  ngOnDestroy(): void {
    this.routeDataSubscription?.unsubscribe();
  }

  canDeactivate(): boolean {
    return this.cancel || this.isNew() || this.isValid();
  }

  isNew(): boolean {
    return this.recipe.id === undefined;
  }

  isValid(): boolean {
    return (isNotBlank(this.recipe.name) && isNotBlank(this.recipe.description) && isNotBlank(this.recipe.imagePath));
  }

  onCancel(): void {
    this.cancel = true;
    this.router.navigate([...NavigatePath], {relativeTo: this.route});
  }

  onSave(): void {
    if (isTypeWithId(this.recipe)) {
      this.recipeService.updateRecipe(this.recipe);
    } else {
      this.recipeService.addRecipe(this.recipe);
    }
    this.router.navigate([...NavigatePath], {relativeTo: this.route});
  }
}
