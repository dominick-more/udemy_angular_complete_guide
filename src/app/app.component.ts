import { Component } from '@angular/core';

const initMaxSeconds = 0;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  #secondsRunning: number = initMaxSeconds;

  getSecondsRunning(): number {
    return this.#secondsRunning;
  }

  getSecondsValues(): number[] {
    const secondsRunning = this.getSecondsRunning();
    return [...Array(secondsRunning).keys()].map((value): number => value + 1);
  }

  onGameRunning(second: number) {
    this.#secondsRunning = Math.max(this.#secondsRunning, second);
  }

  onGameStopped() {}
}
