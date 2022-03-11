import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Ingredient from 'src/app/types/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @Output() readonly itemAdded = new EventEmitter<Ingredient>();
  amount: number = 1;
  name: string = '';
  
  constructor() { }

  ngOnInit(): void {
  }

  onAddItem(): void {
    this.itemAdded.emit({name: this.name, amount: this.amount});
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
