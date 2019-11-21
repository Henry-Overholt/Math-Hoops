import { Component, OnInit, ɵConsole } from "@angular/core";
import { NgForm } from "@angular/forms";
import { GameService } from "./../services/game.service";
import { DraftService } from "./../services/draft.service";
import { stringify } from "querystring";

@Component({
  selector: "app-game-board",
  templateUrl: "./game-board.component.html",
  styleUrls: ["./game-board.component.css"]
})
export class GameBoardComponent implements OnInit {
  spin: number;
  turn: boolean;
  start: boolean = false;
  end: boolean = false;
  redDice: number;
  blueDice: number;
  playerScore: number = 0;
  computerScore: number = 0;
  commentary: string = "The Game is about to begin!";
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
  added: number;
  correctAdd: number;
  subtracted: number;
  correctSub: number;
  multiplied: number;
  correctTimes: number;
  divided: number;
  isDivisible: boolean;
  correctDivide: number;
  evenNumbers: any[] = [
    { number: 8, color: "purple", value: 3, select: false, id: "eight" },
    { number: 2, color: "orange", value: 3, select: false, id: "two" },
    { number: 18, color: "red", value: 3, select: false, id: "eighteen" },
    { number: 48, color: "orange", value: 3, select: false, id: "fortyEight" },
    { number: 16, color: "red", value: 3, select: false, id: "sixteen" },
    { number: 24, color: "blue", value: 3, select: false, id: "twentyFour" },
    { number: 40, color: "purple", value: 2, select: false, id: "forty" },
    { number: 64, color: "orange", value: 2, select: false, id: "sixtyFour" },
    { number: 56, color: "red", value: 2, select: false, id: "fiftySix" },
    { number: 28, color: "green", value: 2, select: false, id: "twentyEight" },
    { number: 12, color: "orange", value: 2, select: false, id: "twelve" },
    { number: 4, color: "red", value: 2, select: false, id: "four" },
    { number: 36, color: "blue", value: 2, select: false, id: "thirtySix" },
    { number: 20, color: "purple", value: 2, select: false, id: "twenty" },
    { number: 14, color: "green", value: 2, select: false, id: "fourteen" },
    { number: 6, color: "green", value: 2, select: false, id: "six" },
    { number: 10, color: "blue", value: 2, select: false, id: "ten" },
    { number: 30, color: "purple", value: 2, select: false, id: "thirty" },
    { number: 42, color: "blue", value: 2, select: false, id: "fortyTwo" },
    { number: 32, color: "green", value: 2, select: false, id: "thirtyTwo" }
  ];
  oddNumbers: any[] = [
    { number: 7, color: "purple", value: 3, select: false, id: "seven" },
    { number: 1, color: "orange", value: 3, select: false, id: "one" },
    { number: 15, color: "red", value: 3, select: false, id: "fifteen" },
    { number: 49, color: "orange", value: 3, select: false, id: "fortyNine" },
    { number: 35, color: "red", value: 3, select: false, id: "thirtyFive" },
    { number: 63, color: "blue", value: 3, select: false, id: "sixtyThree" },
    { number: 17, color: "purple", value: 2, select: false, id: "seventeen" },
    { number: 25, color: "orange", value: 2, select: false, id: "twentyFive" },
    { number: 27, color: "red", value: 2, select: false, id: "twentySeven" },
    {
      number: 63,
      color: "green",
      value: 2,
      select: false,
      id: "greenSixtyThree"
    },
    { number: 11, color: "orange", value: 2, select: false, id: "eleven" },
    { number: 3, color: "red", value: 2, select: false, id: "three" },
    { number: 21, color: "blue", value: 2, select: false, id: "twentyOne" },
    { number: 81, color: "purple", value: 2, select: false, id: "eightyOne" },
    { number: 5, color: "green", value: 2, select: false, id: "five" },
    { number: 13, color: "green", value: 2, select: false, id: "thirteen" },
    { number: 15, color: "blue", value: 2, select: false, id: "blueFifteen" },
    { number: 9, color: "blue", value: 2, select: false, id: "nine" },
    { number: 45, color: "purple", value: 2, select: false, id: "fortyFive" },
    {
      number: 35,
      color: "green",
      value: 2,
      select: false,
      id: "greenThirtyFive"
    }
  ];
  select: boolean;
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
    this.turn = this.draftService.passTurnDown();
  }
  startGame() {
    if (this.turn === false) {
      this.commentary =
        "The Game has started! You won the tip-off! You start with the ball!";
    } else {
      this.commentary =
        "The Game has started! The Computer won the tip-off! The Computer starts with the ball!";
    }
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
  findShot(form): void {
    // console.log(form);
    this.added = form.added;
    this.subtracted = form.subtracted;
    this.multiplied = form.multiplied;
    this.divided = form.divided;
    this.highlightShots(
      this.added,
      this.subtracted,
      this.multiplied,
      this.divided
    );
  }
  highlightShots(added, subtracted, multiplied, divided?) {
    if (this.turn === false) {
      this.evenNumbers.forEach(number => {
        if (number.number === added) {
          number.select = true;
        } else if (number.number === subtracted) {
          number.select = true;
        } else if (number.number === multiplied) {
          number.select = true;
        } else if (number.number === divided) {
          number.select = true;
        } else {
          number.select = false;
        }
      });
    } else {
      this.oddNumbers.forEach(number => {
        if (number.number === added) {
          number.select = true;
        } else if (number.number === subtracted) {
          number.select = true;
        } else if (number.number === multiplied) {
          number.select = true;
        } else if (number.number === divided) {
          number.select = true;
        } else {
          number.select = false;
        }
      });
    }
  }

  rollDice(): void {
    document.querySelector("form").reset();
    this.gameService.rollDice();
    this.redDice = this.gameService.getRed();
    this.blueDice = this.gameService.getBlue();
    this.correctAdd = this.redDice + this.blueDice;
    this.correctSub = Math.abs(this.redDice - this.blueDice);
    this.correctTimes = this.redDice * this.blueDice;
    if (this.redDice >= this.blueDice) {
      if (this.redDice % this.blueDice === 0) {
        this.isDivisible = true;
        this.divided = this.redDice / this.blueDice;
      } else {
        this.isDivisible = false;
      }
    } else {
      if (this.blueDice % this.redDice === 0) {
        this.correctDivide = this.blueDice / this.redDice;
      } else {
        this.isDivisible = false;
      }
    }
    this.evenNumbers.forEach(number => {
      number.select = false;
    });
    this.oddNumbers.forEach(numbers => {
      numbers.select = false;
    });
  }

  takeEvenShot(i: number): void {
    let spot = this.evenNumbers[i];
    this.spin = Math.random() * 1;
    if (spot.color == "orange") {
      this.commentary = `${this.orangeP.name} shoots for ${spot.value}!`;
      setTimeout(() => {
        if (spot.value === 3) {
          if (this.orangeP.threepoint <= this.spin) {
            this.makeShot(this.orangeP.name, spot.value, this.turn);
          } else {
            this.missShot(this.orangeP.name);
          }
        } else {
          if (this.orangeP.fieldgoal <= this.spin) {
            this.makeShot(this.orangeP.name, spot.value, this.turn);
          } else {
            this.missShot(this.orangeP.name);
          }
        }
      }, 1000);
      // } else if (spot.color == "blue") {
      //   this.commentary = `${this.blueP.name} shoots for ${points}!`;
      //   setTimeout(() => {
      //     if (this.blueP.fieldgoal <= this.spin) {
      //       this.commentary = `${this.blueP.name} scored ${points}! It's the computer's turn!`;
      //     } else {
      //       this.commentary = `${this.blueP.name} missed! It's the computer's turn!`;
      //     }
      //   }, 1000);
      // } else if (spot.color == "red") {
      //   this.commentary = `${this.redP.name} shoots for ${points}!`;
      //   setTimeout(() => {
      //     if (this.redP.fieldgoal <= this.spin) {
      //       this.commentary = `${this.redP.name} scored ${points}! It's the computer's turn!`;
      //     } else {
      //       this.commentary = `${this.redP.name} missed! It's the computer's turn!`;
      //     }
      //   }, 1000);
      // } else if (spot.color == "green") {
      //   this.commentary = `${this.greenP.name} shoots for ${points}!`;
      //   setTimeout(() => {
      //     if (this.greenP.fieldgoal <= this.spin) {
      //       this.commentary = `${this.greenP.name} scored ${points}! It's the computer's turn!`;
      //     } else {
      //       this.commentary = `${this.greenP.name} missed! It's the computer's turn!`;
      //     }
      //   }, 1000);
      // } else if (spot.color == "purple") {
      //   this.commentary = `${this.purpleP.name} shoots for ${points}!`;
      //   setTimeout(() => {
      //     if (this.purpleP.fieldgoal <= this.spin) {
      //       this.commentary = `${this.purpleP.name} scored ${points}! It's the computer's turn!`;
      //     } else {
      //       this.commentary = `${this.purpleP.name} missed! It's the computer's turn!`;
      //     }
      //   }, 1000);
      // }
      this.turn = !this.turn;
    }
  }
  takeOddShot(i: number): void {
    console.log(this.oddNumbers[i]);
  }
  makeShot(name: string, points: number, turn: boolean) {
    let stories: string[] = [
      `What a basket by ${name}! That's #SCTop10!`,
      `${name} makes the deep ${points}! I didn't think he was going to make that!`,
      `${name} hits the ${points}, and crowd goes wild!`,
      `${name} gets a couple a lucky bounces before it falls for ${points}!`,
      `His ankles are going to be sore tomorrow after that move by ${name} to get the clean look for ${points}!`
    ];
    let randomInt: number = Math.floor(Math.random() * stories.length);
    if (turn === true) {
      this.commentary = stories[randomInt];
      this.computerScore += points;
    } else {
      this.commentary = stories[randomInt];
      this.playerScore += points;
    }
    this.turn = !this.turn;
  }
  missShot(name: string) {
    let stories: string[] = [
      `That was a terrible miss by ${name}! Just truly terrible!`,
      `${name} with the miss! You can hear the crowd chanting "Air-Ball, Air-Ball"! Not a nice place to play!`,
      `${name} with the miss, and the ball is going the other way!`,
      `Really tough miss there for ${name}, unlucky.`,
      `Strong defense there to prevent the shot from ${name}`
    ];
    let randomInt: number = Math.floor(Math.random() * stories.length);
    this.commentary = stories[randomInt];
    this.turn = !this.turn;
  }
}
