import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { RecipesStartComponent } from './recipes/recipes-start/recipes-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import RecipeResolver, { RecipeDataKey } from './recipes/recipe-resolver.service';
import { UrlEncodePipe } from './shared/pipes/url-encode.pipe';
import RecipeService from './recipes/recipe.service';
import ShoppingListService from './shopping-list/shopping-list.service';
import CanDeactivateGuard from './shared/guards/can-deactivate.guard';


const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes', component: RecipesComponent,
    children: [
      {
        path: '',
        component: RecipesStartComponent
      },
      {
        path: 'new',
        component: RecipeEditComponent
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: {[RecipeDataKey]: RecipeResolver}
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: {[RecipeDataKey]: RecipeResolver},
        canDeactivate: [CanDeactivateGuard]
      }]
  },
  {
    path: 'shopping-list', component: ShoppingListComponent,
    children: [{
      path: ':id', component: ShoppingEditComponent,
      canDeactivate: [CanDeactivateGuard]
    }]
  }
];

@NgModule({
  declarations: [
    UrlEncodePipe
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {enableTracing: true})
  ],
  providers: [CanDeactivateGuard, RecipeResolver, RecipeService, ShoppingListService],
  exports: [RouterModule, UrlEncodePipe]
})
export class AppRoutingModule { }
