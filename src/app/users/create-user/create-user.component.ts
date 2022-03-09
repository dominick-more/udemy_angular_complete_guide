import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateuserComponent implements OnInit {

  userName: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  createUser(): void {
    console.log(`Created user: ${this.userName}`);
    this.userName = '';
  }
}
