import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import AuthGuardService from './auth-guard.service';
import AuthService from './auth.service';
import { ErrorMessageDataKey, ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import CanDeactivateGuard from './servers/edit-server/can-deactivate-guard.service';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import ServerResolver, { ServerDataKey } from './servers/server-resolver.service';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent },
  {
    path: 'users', component: UsersComponent,
    children: [
      {path: ':id', component: UserComponent }
    ]
  },
  {
    path: 'servers',
    // canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    component: ServersComponent,
    children: [{
      path: ':id',
      component: ServerComponent,
      resolve: {[ServerDataKey]: ServerResolver},
    },
    {
      path: ':id/edit',
      component: EditServerComponent,
      canDeactivate: [CanDeactivateGuard]
    }]
  },
  // {path: 'not-found', component: PageNotFoundComponent },
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: {[ErrorMessageDataKey]: 'Page not found!'}
  },
  {path: '**', redirectTo: '/not-found'}
];
  
@NgModule({
    imports: [
        // RouterModule.forRoot(appRoutes, {useHash: true})
        RouterModule.forRoot(appRoutes)
    ],
    providers: [AuthGuardService, AuthService, CanDeactivateGuard, ServerResolver],
    exports: [RouterModule]
})
export class AppRoutingModule {}