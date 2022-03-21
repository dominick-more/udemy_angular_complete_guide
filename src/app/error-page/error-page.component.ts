import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';

const defaultMessage = 'An unknown error occurred!';
export const ErrorMessageDataKey = 'message';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit, OnDestroy {
  private routeDataSubscription: Subscription | undefined;
  public errorMessage: string = '';

  constructor(private readonly route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.errorMessage = this.route.snapshot.data[ErrorMessageDataKey] || defaultMessage;
    this.routeDataSubscription = this.route.data.subscribe((data: Data) => {
      this.errorMessage = data[ErrorMessageDataKey] || defaultMessage;
    })
  }

  ngOnDestroy(): void {
    this.routeDataSubscription?.unsubscribe();
  }

}
