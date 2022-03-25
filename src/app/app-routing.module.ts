import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { RecipesStartComponent } from './recipes/recipes-start/recipes-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import RecipeResolver, { RecipeDataKey } from './recipes/recipe-resolver.service';
import { UrlEncodePipe } from './shared/pipes/url-encode.pipe';
import CanDeactivateGuard from './shared/guards/can-deactivate.guard';
import IngredientResolver, { IngredientDataKey } from './shopping-list/ingredient-resolver.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import AuthGuard from './auth/auth.guard';


const appRoutes: Routes = [
  {
    path: '', redirectTo: '/recipes', pathMatch: 'full'
  },
  {
    path: 'auth', component: AuthComponent
  },
  {
    path: 'recipes', component: RecipesComponent,
    canActivate: [AuthGuard],
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
        // resolve: {[RecipeDataKey]: RecipeResolver},
        canDeactivate: [CanDeactivateGuard]
      }]
  },
  {
    path: 'shopping-list', component: ShoppingListComponent,
    children: [
      {
        path: '',
        component: ShoppingEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: ':id',
        component: ShoppingEditComponent,
        resolve: {[IngredientDataKey]: IngredientResolver},
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  declarations: [
    UrlEncodePipe
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {enableTracing: false})
  ],
  providers: [
    AuthGuard,
    CanDeactivateGuard,
    IngredientResolver,
    RecipeResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  exports: [RouterModule, UrlEncodePipe]
})
export class AppRoutingModule { }
