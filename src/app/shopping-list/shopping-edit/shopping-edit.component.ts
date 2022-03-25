import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { isTypeWithId } from 'src/app/shared/app.utilities';
import CanDeactivateCheck from 'src/app/types/can-deactivate-check';
import Ingredient from 'src/app/types/ingredient.model';
import { WithOptional } from 'src/app/types/type-script';
import { IngredientDataKey } from '../ingredient-resolver.service';
import ShoppingListService, { createEditableIngredient } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy, CanDeactivateCheck {
  @ViewChild('shopForm') private shopForm: NgForm;
  private routeDataSubscription: Subscription | undefined;
  public ingredient: WithOptional<Ingredient, 'id'> = createEditableIngredient();
  
  constructor(private readonly shoppingListService: ShoppingListService,
    private readonly route: ActivatedRoute, private readonly router: Router) { }
  
  /**
   * Subscribes to RecipeResolver recipes 'updated' event.
   * @see {@link RecipeResolver} for data source.
   */
   ngOnInit(): void {
    this.routeDataSubscription = this.route.data.subscribe((data: Data) => {
      this.ingredient = createEditableIngredient(data[IngredientDataKey]);
    });
  }

  ngOnDestroy(): void {
    this.routeDataSubscription?.unsubscribe();
  }
  
  canDeactivate(): boolean {
    return this.isNew() || this.isValid();
  }
  
  isNew(): boolean {
    return this.ingredient.id === undefined;
  }

  isValid(): boolean {
    return !this.shopForm.touched || !!this.shopForm.valid;
  }

  onClear(): void {
    if (isTypeWithId(this.ingredient)) {
      this.router.navigate(['..'], {relativeTo: this.route});
    } else {
      this.ingredient = createEditableIngredient();
      this.shopForm.reset(this.ingredient);
    }
  }

  onDelete(): void {
    if (isTypeWithId(this.ingredient)) {
      this.shoppingListService.deleteItem(this.ingredient.id);
      this.router.navigate(['..'], {relativeTo: this.route});
    }
    
  }

  onSave(): void {
    if (isTypeWithId(this.ingredient)) {
      this.shoppingListService.updateItem(this.ingredient);
      this.router.navigate(['/shopping-list']);
    } else {
      this.shoppingListService.addItem(this.ingredient);
      this.ingredient = createEditableIngredient();
      this.shopForm.reset(this.ingredient);
    }
  }

  convertStringToNumber(value: string): number {
    if (/^\s*$/) {
      return NaN;
    }
    return Number(value.trim());
  }
}
