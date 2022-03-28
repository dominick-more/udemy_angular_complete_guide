import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import CanDeactivateGuard from '../shared/guards/can-deactivate.guard';
import { SharedModule } from '../shared/shared.module';
import IngredientResolver, { IngredientDataKey } from './ingredient-resolver.service';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';


const shoppingListRoutes: Routes = [
  {
    path: '', component: ShoppingListComponent,
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
  declarations: [],
  imports: [
    RouterModule.forChild(shoppingListRoutes),
    SharedModule
  ],
  providers: [
    IngredientResolver  
  ],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule { }
