import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class GameService {
  redDice: number;
  blueDice: number;
  playerOneScore: number = 0;
  playerTwoScore: number = 0;
  playerTurn: boolean = true;

  constructor() {}
  returnPlayerTurn(): boolean {
    return this.playerTurn;
  }
  rollDice(): number {
    return (
      (this.redDice = Math.floor(Math.random() * 10)),
      (this.blueDice = Math.floor(Math.random() * 10))
    );
  }
  getBlue(): number {
    return this.blueDice;
  }
  getRed(): number {
    return this.redDice;
  }
  updatePlayerOneScore(value: string): boolean {
    if (value === "2") {
      this.playerOneScore += 2;
    } else {
      this.playerOneScore += 3;
    }
    console.log(`Player One's Score: ${this.playerOneScore}`);
    return (this.playerTurn = !this.playerTurn);
  }
  updatePlayerTwoScore(value: string): boolean {
    if (value === "2") {
      this.playerTwoScore += 2;
    } else {
      this.playerTwoScore += 3;
    }
    console.log(`Player Two's Score: ${this.playerTwoScore}`);
    return (this.playerTurn = !this.playerTurn);
  }
  getPlayerOneScore(): number {
    return this.playerOneScore;
  }
  getPlayerTwoScore(): number {
    return this.playerTwoScore;
  }
}
