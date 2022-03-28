import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesStartComponent } from './recipes/recipes-start/recipes-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ToggleClassClickDirective } from './shared/directives/toggle-class-click.directive';
import { AppRoutingModule } from './app-routing.module';
import { UrlEncodePipe } from './shared/pipes/url-encode.pipe';
import RecipeService from './recipes/recipe.service';
import ShoppingListService from './shopping-list/shopping-list.service';
import DataStorageService from './shared/storage/data-storage.service';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AlertComponent } from './shared/alert/alert.component';
import { PlaceholderDirective } from './shared/directives/placeholder.directive';

@NgModule({
  declarations: [
    PlaceholderDirective,
    UrlEncodePipe,
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeItemComponent,
    RecipeListComponent,
    RecipesStartComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    ToggleClassClickDirective,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    DataStorageService,
    RecipeService,
    ShoppingListService],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
