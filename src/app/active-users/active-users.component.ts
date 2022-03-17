import { Component, EventEmitter, Input, Output } from '@angular/core';
import UserService from '../user.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent {
  constructor(private readonly userService: UserService) {}

  getUsers() {
    return this.userService.getUsers({statuses: ['active']});
  }

  onToggleStatus(name: string) {
    this.userService.setStatus(name, 'inactive');
  }
}
