import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

const gameRunningEmitFrequency = 1000;

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit, OnDestroy {
  @Output() readonly gameRunning = new EventEmitter<number>();
  @Output() readonly gameStopped = new EventEmitter<void>();
  
  #gameRunningIntervalId: ReturnType<typeof setInterval> | undefined;

  constructor() { }

  ngOnDestroy(): void {
    this.clearGameRunnungInterval();
  }

  ngOnInit(): void {
  }

  isGameRunning(): boolean {
    return this.#gameRunningIntervalId !== undefined;
  }

  onStartGame(): void {
    if (!this.isGameRunning()) {
      let counter: number = 0;
      this.#gameRunningIntervalId = setInterval(() => {
        this.gameRunning.emit(++counter);
      }, gameRunningEmitFrequency);
    }
  }

  onStopGame(): void {
    this.clearGameRunnungInterval();
  }

  private clearGameRunnungInterval(): void {
    if (this.isGameRunning()) {
      console.log(`gameRunningIntervalId=${JSON.stringify(this.#gameRunningIntervalId)}`);
      clearInterval(this.#gameRunningIntervalId);
      this.#gameRunningIntervalId = undefined;
      this.gameStopped.emit();
    }
  }
}
