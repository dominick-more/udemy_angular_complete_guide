import { Component, OnInit } from '@angular/core';

const displayWaitTimeout = 250;

@Component({
  selector: 'app-display-secret',
  templateUrl: './display-secret.component.html',
  styleUrls: ['./display-secret.component.css']
})

export class DisplaySecretComponent implements OnInit {
  displaySecret: boolean = false;
  clickLogs: Date[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onClickDisplaySecret(): void {
    this.displaySecret = true;
    this.clickLogs.push(new Date());
    setTimeout(() => {
      this.displaySecret = false;
    }, displayWaitTimeout);
  }

}
