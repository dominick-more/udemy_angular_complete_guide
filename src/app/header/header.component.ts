import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import AppTarget from '../types/app-target';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() readonly appTargetClicked = new EventEmitter<AppTarget>();

  collapsed: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  onClickAppTarget(appTarget: AppTarget) {
    this.appTargetClicked.emit(appTarget);
  }
}
