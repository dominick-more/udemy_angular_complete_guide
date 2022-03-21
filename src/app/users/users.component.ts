import { Component, OnInit } from '@angular/core';
import User from './user.model';
import UserService from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users: User[] = [];

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }
  
}
