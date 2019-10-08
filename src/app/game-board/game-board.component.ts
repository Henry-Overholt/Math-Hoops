import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { GameService } from "./../services/game.service";
import { DraftService } from "./../services/draft.service";

@Component({
  selector: "app-game-board",
  templateUrl: "./game-board.component.html",
  styleUrls: ["./game-board.component.css"]
})
export class GameBoardComponent implements OnInit {
  spin: number;
  turn: boolean = false;
  start: boolean = false;
  end: boolean = false;
  redDice: number;
  blueDice: number;
  playerScore: number = 0;
  computerScore: number = 0;
  commentary: string = "The Game has started!";
  redP: any; //player's red player
  blueP: any; //player's blue player
  orangeP: any; //player's orange player
  purpleP: any; //player's purple player
  greenP: any; //player's green player
  redC: any; //computer's red player
  blueC: any; //computer's blue player
  orangeC: any; //computer's orange player
  purpleC: any; //computer's purple player
  greenC: any; //computer's green player
  final: string;
  constructor(
    private gameService: GameService,
    private draftService: DraftService
  ) {}

  ngOnInit() {
    this.redP = this.draftService.getRedP();
    this.blueP = this.draftService.getBlueP();
    this.orangeP = this.draftService.getOrangeP();
    this.purpleP = this.draftService.getPurpleP();
    this.greenP = this.draftService.getGreenP();
    this.redC = this.draftService.getRedC();
    this.blueC = this.draftService.getBlueC();
    this.orangeC = this.draftService.getOrangeC();
    this.purpleC = this.draftService.getPurpleC();
    this.greenC = this.draftService.getGreenC();
  }
  startGame() {
    this.start = true;
    this.rollDice();
  }
  endGame(): void {
    this.end = true;
    if ((this.playerScore = this.computerScore)) {
      this.final = `You tied ${this.playerScore} to ${this.computerScore}.  Some say it's like kissing your sibling.`;
    } else if (this.playerScore > this.computerScore) {
      this.final = `You won! With a final score of ${this.playerScore} to ${this.computerScore}! Congrats!`;
    } else {
      this.final = `You lost, you suck! With a final score of ${this.playerScore} to ${this.computerScore} the computer was victorious! Congrats!`;
    }
  }
  changeTurn(): void {
    this.turn = !this.turn;
    // if (this.playerTurn === false) {
    //   this.commentary = "It's Player One's Turn!";
    // } else {
    //   this.commentary = "It's Player Two's Turn!";
    // }
  }
  findShot(form: NgForm): void {
    console.log(form);
  }
  rollDice(): void {
    this.gameService.rollDice();
    this.redDice = this.gameService.getRed();
    this.blueDice = this.gameService.getBlue();
  }
  takeShot(color, points: number): void {
    this.spin = Math.random() * 1;
    if (color == "orange") {
      this.commentary = `${this.orangeP.name} shoots for ${points}!`;
      setTimeout(() => {
        if (this.orangeP.fieldgoal <= this.spin) {
          if ((this.turn = true)) {
            this.playerScore += points;
          } else {
            this.computerScore += points;
          }
          this.commentary = `${this.orangeP.name} scored ${points}! It's the computer's turn!`;
        } else {
          this.commentary = `${this.orangeP.name} missed! It's the computer's turn!`;
        }
      }, 1000);
    } else if (color == "blue") {
      this.commentary = `${this.blueP.name} shoots for ${points}!`;
      setTimeout(() => {
        if (this.blueP.fieldgoal <= this.spin) {
          if ((this.turn = true)) {
            this.playerScore += points;
          } else {
            this.computerScore += points;
          }
          this.commentary = `${this.blueP.name} scored ${points}! It's the computer's turn!`;
        } else {
          this.commentary = `${this.blueP.name} missed! It's the computer's turn!`;
        }
      }, 1000);
    } else if (color == "red") {
      this.commentary = `${this.redP.name} shoots for ${points}!`;
      setTimeout(() => {
        if (this.redP.fieldgoal <= this.spin) {
          if ((this.turn = true)) {
            this.playerScore += points;
          } else {
            this.computerScore += points;
          }
          this.commentary = `${this.redP.name} scored ${points}! It's the computer's turn!`;
        } else {
          this.commentary = `${this.redP.name} missed! It's the computer's turn!`;
        }
      }, 1000);
    } else if (color == "green") {
      this.commentary = `${this.greenP.name} shoots for ${points}!`;
      setTimeout(() => {
        if (this.greenP.fieldgoal <= this.spin) {
          if ((this.turn = true)) {
            this.playerScore += points;
          } else {
            this.computerScore += points;
          }
          this.commentary = `${this.greenP.name} scored ${points}! It's the computer's turn!`;
        } else {
          this.commentary = `${this.greenP.name} missed! It's the computer's turn!`;
        }
      }, 1000);
    } else if (color == "purple") {
      this.commentary = `${this.purpleP.name} shoots for ${points}!`;
      setTimeout(() => {
        if (this.purpleP.fieldgoal <= this.spin) {
          if ((this.turn = true)) {
            this.playerScore += points;
          } else {
            this.computerScore += points;
          }
          this.commentary = `${this.purpleP.name} scored ${points}! It's the computer's turn!`;
        } else {
          this.commentary = `${this.purpleP.name} missed! It's the computer's turn!`;
        }
      }, 1000);
    }
    this.turn = !this.turn;
  }
}
