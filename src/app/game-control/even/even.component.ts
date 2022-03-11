import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-even',
  template: '<span>Even - {{value}}</span>',
  styleUrls: ['./even.component.css']
})
export class EvenComponent implements OnInit {

  @Input() readonly value: number;

  constructor() { }

  ngOnInit(): void {
  }
}
