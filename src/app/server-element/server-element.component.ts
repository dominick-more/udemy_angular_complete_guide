import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import ServerElement from '../shared/server-element.model';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {

  @Input('serverElement') element: ServerElement;

  constructor() {
    console.log(`'constructor' called`);
  }

  ngOnDestroy(): void {
    console.log(`'ngOnDestroy' called`);
  }

  ngAfterViewInit(): void {
    console.log(`'ngAfterViewInit' called`);
  }

  ngAfterViewChecked(): void {
    console.log(`'ngAfterViewChecked' called`);
  }

  ngAfterContentChecked(): void {
    console.log(`'ngAfterContentChecked' called`);
  }

  ngAfterContentInit(): void {
    console.log(`'ngAfterContentInit' called`);
  }

  ngDoCheck(): void {
    console.log(`'ngDoCheck' called`);
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log(`'ngOnChanges' called: ${JSON.stringify(changes)}`);
  }

  ngOnInit(): void {
    console.log(`'ngOnInit' called`);
  }
}
