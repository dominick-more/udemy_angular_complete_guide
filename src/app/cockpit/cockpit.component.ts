import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import ServerElement from '../shared/server-element.model';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() readonly blueprintCreated = new EventEmitter<Pick<ServerElement, 'name' | 'content'>>();
  @Output() readonly serverCreated = new EventEmitter<Pick<ServerElement, 'name' | 'content'>>();

  constructor() { }

  ngOnInit(): void {
  }

  onAddBlueprint(data: Pick<ServerElement, 'name' | 'content'>) {
    this.blueprintCreated.emit(data);
  }

  onAddServer(data: Pick<ServerElement, 'name' | 'content'>) {
    this.serverCreated.emit(data);
  }
}
