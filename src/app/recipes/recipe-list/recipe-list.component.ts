import { Component, OnInit } from '@angular/core';
import Recipe from 'src/app/types/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  readonly recipes: Readonly<Recipe>[] = [
    {
      name: 'A Test Recipe',
      description: 'This is simply a test',
      imagePath: 'https://image.brigitte.de/10394730/t/eI/v25/w1440/r1/-/spinatquiche.jpg'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
