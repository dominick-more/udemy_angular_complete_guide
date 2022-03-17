import { Component } from '@angular/core';
import UserService from '../user.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent {
  constructor(private readonly userService: UserService) {}

  getUsers() {
    return this.userService.getUsers({statuses: ['inactive']});
  }

  onToggleStatus(name: string) {
    this.userService.setStatus(name, 'active');
  }
}
