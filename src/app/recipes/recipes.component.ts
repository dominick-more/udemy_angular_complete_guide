import { Component, OnInit } from '@angular/core';
import Recipe from '../types/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  selectedRecipe: Recipe | undefined = undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
