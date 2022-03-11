import { Component, Input, OnInit } from '@angular/core';
import Recipe from 'src/app/types/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe: Recipe | undefined = undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
