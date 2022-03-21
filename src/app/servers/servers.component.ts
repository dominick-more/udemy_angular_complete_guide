import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Server from './server.model';
import ServerService from './server.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit, OnDestroy {
  private serverUpdateSubscription: Subscription | undefined;
  public servers: Server[] = [];

  constructor(private readonly serverService: ServerService,
    private readonly router: Router) { }
  
  ngOnInit() {
    this.servers = this.serverService.getServers();
    this.serverUpdateSubscription = this.serverService.
      serverUpdateEmitter.subscribe((servers: Server[]) => {
        this.servers = servers;
      });
  }

  ngOnDestroy(): void {
    this.serverUpdateSubscription?.unsubscribe();
  }

  

  onReload() {
    this.router.navigate(['/servers']);
  }

}
