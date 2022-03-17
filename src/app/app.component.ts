import { Component } from '@angular/core';
import { UserStatusCounterService } from './user-status-counter.service';
import UserService, { GetUsersParams, User, UserStatus } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private readonly userService: UserService,
    private readonly counterService: UserStatusCounterService) {}

    getStatusChanges(status: UserStatus) {
      return this.counterService.getStatusChanges(status);
    }

    getUsers(params?: GetUsersParams): User[] {
      return this.userService.getUsers(params);
    }
}
