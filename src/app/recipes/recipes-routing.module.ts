import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import AuthGuard from '../auth/auth.guard';
import CanDeactivateGuard from '../shared/guards/can-deactivate.guard';
import { SharedModule } from '../shared/shared.module';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import RecipeResolver, { RecipeDataKey } from './recipe-resolver.service';
import { RecipesStartComponent } from './recipes-start/recipes-start.component';
import { RecipesComponent } from './recipes.component';


const recipeRoutes: Routes = [
  {
    path: '', component: RecipesComponent,
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
  }
];

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    RouterModule.forChild(recipeRoutes)
  ],
  exports: [RouterModule],
  providers: [
    RecipeResolver
  ]
})
export class RecipesRoutingModule { }
