import { Component, OnInit } from '@angular/core';
import ShoppingListService from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  amount: number = 1;
  name: string = '';
  
  constructor(private readonly ingredientsService: ShoppingListService) { }
  
  ngOnInit(): void {}
  
  onAddItem(): void {
    this.ingredientsService.addIngredient({name: this.name, amount: this.amount});
  }

  convertStringToNumber(value: string): number {
    if (/^\s*$/) {
      return NaN;
    }
    return Number(value.trim());
  }

  isBlank(value?: string): boolean {
    return (value === undefined) || /^\s*$/.test(value);
  }
}
