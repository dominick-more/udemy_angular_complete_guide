import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import ShoppingListService from 'src/app/shopping-list/shopping-list.service';
import Recipe from 'src/app/types/recipe.model';
import { RecipeDataKey } from '../recipe-resolver.service';
import RecipeService from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  private routeDataSubscription: Subscription | undefined;
  public recipe: Recipe | undefined;

  constructor(private readonly recipeService: RecipeService,
    private readonly shoppingListService: ShoppingListService,
    private readonly route: ActivatedRoute,
    private readonly router: Router) { }

  /**
   * Subscribes to RecipeResolver recipes 'updated' event.
   * @see {@link RecipeResolver} for data source.
   */
   ngOnInit(): void {
    this.routeDataSubscription = this.route.data.subscribe((data: Data) => {
      this.recipe = data[RecipeDataKey];
    });
  }

  ngOnDestroy(): void {
    this.routeDataSubscription?.unsubscribe();
  }

  onAddToShoppingList() {
    if (!this.recipe) {
      return;
    }
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe?.id);
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }
}
