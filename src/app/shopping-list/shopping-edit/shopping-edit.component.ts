import { Component, OnInit } from '@angular/core';
import { isNotBlank } from 'src/app/shared/app.utilities';
import CanDeactivateCheck from 'src/app/types/can-deactivate-check';
import ShoppingListService from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, CanDeactivateCheck {

  amount: number = 1;
  name: string = '';
  
  constructor(private readonly ingredientsService: ShoppingListService) { }
  
  ngOnInit(): void {}
  
  canDeactivate(): boolean {
    return (isNotBlank(this.name) && this.amount > 0);
  }
  
  onAddItem(): void {
    this.ingredientsService.addIngredient({name: this.name, amount: this.amount});
  }

  convertStringToNumber(value: string): number {
    if (/^\s*$/) {
      return NaN;
    }
    return Number(value.trim());
  }
}
