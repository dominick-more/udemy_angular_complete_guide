import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import User from '../user.model';
import UserService from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  private routeParamsSubscription: Subscription | undefined;
  private userId: number | undefined;
  public user: User | undefined;

  constructor(private readonly userService: UserService,
    private readonly route: ActivatedRoute) { }
  
  ngOnInit() {
    this.userId = Number(this.route.snapshot.params['id']);
    this.user = this.userService.getUserById(this.userId);
    this.routeParamsSubscription = this.route.params.subscribe((params: Params) => {
      this.userId = Number(params['id']);
      this.user = this.userService.getUserById(this.userId);
    });
  }

  ngOnDestroy(): void {
    this.routeParamsSubscription?.unsubscribe();
  }
}
