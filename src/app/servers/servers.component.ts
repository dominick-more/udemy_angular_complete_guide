import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer: boolean = false;
  serverCreationStatus: string = 'No server was created!';
  serverName = '';

  constructor() { }

  ngOnInit(): void {
    setTimeout((): void => {
      this.allowNewServer = true;
    }, 2000);
  }

  onCreateServer(): void {
    this.serverCreationStatus = 'Server was created!';
  }

  onUpdateServerName(serverName: string): void {
    this.serverName = serverName;
  }
}
