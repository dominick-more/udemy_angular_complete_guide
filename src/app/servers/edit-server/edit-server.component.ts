import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ServerStatus } from '../server.model';
import ServerService from '../server.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

const defaultName: string = '';
const defaultStatus: ServerStatus = 'offline';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  private routeParamsSubscription: Subscription | undefined;
  private routeQueryParamsSubscription: Subscription | undefined;
  private serverId: number | undefined;
  private changesSaved: boolean = false;
  public allowEdit: boolean = false;
  public serverName: string = defaultName;
  public serverStatus: ServerStatus = defaultStatus;

  constructor(private readonly serverService: ServerService,
    private readonly router: Router,
    private readonly route: ActivatedRoute) { }
  
  private populateFieldValuesFromId() {
    const server = this.serverService.getServerById(this.serverId);
    this.serverName = server?.name || defaultName;
    this.serverStatus = server?.status || defaultStatus;
  }

  canDeactivate = (): boolean | Observable<boolean> | Promise<boolean> => {
    if (!this.allowEdit) {
      return true;
    }
    const server = this.serverService.getServerById(this.serverId);
    if (!this.changesSaved && ((server !== undefined) &&
      ((this.serverName !== server.name) ||
      (this.serverStatus !== server.status)))) {
      return confirm('Do you want to discard the changes?');
    }
    return true;
  }

  ngOnInit() {
    this.serverId = Number(this.route.snapshot.params['id']);
    this.allowEdit = Number(this.route.snapshot.queryParams['allowEdit']) === 1
    this.populateFieldValuesFromId();
    this.routeParamsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.serverId = Number(params['id']);
        this.changesSaved = false;
        this.populateFieldValuesFromId();
      });
    this.routeQueryParamsSubscription = this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.allowEdit = Number(queryParams['allowEdit']) === 1;
      });
  }

  ngOnDestroy(): void {
    this.routeParamsSubscription?.unsubscribe();
    this.routeQueryParamsSubscription?.unsubscribe();
  }

  onUpdateServer() {
    if (!this.serverId) {
      return;
    }
    this.serverService.updateServer(this.serverId, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['/servers']);
  }
}
