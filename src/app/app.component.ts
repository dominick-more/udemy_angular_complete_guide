import { Component } from '@angular/core';
import ServerElement from './shared/server-element.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  readonly serverElements: Readonly<ServerElement>[] = [
    {
      type: 'server',
      name: 'TestServer',
      content: 'Just a test!'
    }
  ];

  onServerAdded(data: Pick<ServerElement, 'name' | 'content'>) {
    this.serverElements.push({
      ...data,
      type: 'server'
    });
  }

  onBlueprintAdded(data: Pick<ServerElement, 'name' | 'content'>) {
    this.serverElements.push({
      ...data,
      type: 'blueprint'
    });
  }
}
