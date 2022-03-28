import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthInterceptor } from './auth/auth.interceptor';
import RecipeService from './recipes/recipe.service';
import DataStorageService from './shared/storage/data-storage.service';
import ShoppingListService from './shopping-list/shopping-list.service';

@NgModule({
    providers: [
      DataStorageService,
      RecipeService,
      ShoppingListService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }
    ]
  })
  export class CoreModule { }