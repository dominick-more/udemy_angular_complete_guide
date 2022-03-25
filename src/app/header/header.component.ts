import { Component, OnInit } from '@angular/core';
import RecipeService from '../recipes/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed: boolean = true;

  constructor(private readonly recipeService : RecipeService) { }

  ngOnInit(): void {
  }

  onFetchData() {
    this.recipeService.fetchItems().subscribe();
  }

  onSaveData() {
    this.recipeService.storeItems().subscribe();
  }
}
