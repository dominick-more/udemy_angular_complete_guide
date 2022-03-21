import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServerDataKey } from '../server-resolver.service';
import Server from '../server.model';
import ServerService from '../server.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit, OnDestroy {
  private routeDataSubscription: Subscription | undefined;
  private routeParamsSubscription: Subscription | undefined;
  private serverId: number | undefined;
  public server: Server | undefined;

  constructor(private readonly serverService: ServerService,
    private readonly route: ActivatedRoute,
    private readonly router: Router) { }

  ngOnInit() {
    this.routeDataSubscription = this.route.data.subscribe((data: Data) => {
      this.server = data[ServerDataKey];
      this.serverId = this.server?.id;
    });
    // this.serverId = Number(this.route.snapshot.params['id']);
    // this.server = this.serverService.getServerById(this.serverId);
    // this.routeParamsSubscription = this.route.params.subscribe((params: Params) => {
    //   this.serverId = Number(params['id']);
    //   this.server = this.serverService.getServerById(this.serverId);
    // });
  }

  ngOnDestroy(): void {
    this.routeDataSubscription?.unsubscribe();
    this.routeParamsSubscription?.unsubscribe();
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }
}
