import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import Server from './server.model';
import ServerService from './server.service';

export const ServerDataKey = 'server';

@Injectable()
export default class ServerResolver implements Resolve<Server | undefined> {
    constructor(private readonly serverService: ServerService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Server | undefined | Observable<Server | undefined> | Promise<Server | undefined> {
        return this.serverService.getServerById(Number(route.params['id']));
    }
    
}