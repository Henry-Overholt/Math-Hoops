import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { DraftService } from "./../services/draft.service";
import {
  CountdownComponent,
  CountdownConfig,
  CountdownEvent
} from "ngx-countdown";

@Component({
  selector: "app-game-board",
  templateUrl: "./game-board.component.html",
  styleUrls: ["./game-board.component.css"]
})
export class GameBoardComponent implements OnInit {
  @ViewChild("gameClock", { static: false })
  private counter: CountdownComponent;
  spin: number;
  turn: boolean = true;
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
  correct: boolean;
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
    {
      number: 7,
      color: "purple",
      value: 3,
      select: false,
      id: "seven",
      index: 0
    },
    {
      number: 1,
      color: "orange",
      value: 3,
      select: false,
      id: "one",
      index: 1
    },
    {
      number: 15,
      color: "red",
      value: 3,
      select: false,
      id: "fifteen",
      index: 2
    },
    {
      number: 49,
      color: "orange",
      value: 3,
      select: false,
      id: "fortyNine",
      index: 3
    },
    {
      number: 35,
      color: "red",
      value: 3,
      select: false,
      id: "thirtyFive",
      index: 4
    },
    {
      number: 63,
      color: "blue",
      value: 3,
      select: false,
      id: "sixtyThree",
      index: 5
    },
    {
      number: 17,
      color: "purple",
      value: 2,
      select: false,
      id: "seventeen",
      index: 6
    },
    {
      number: 25,
      color: "orange",
      value: 2,
      select: false,
      id: "twentyFive",
      index: 7
    },
    {
      number: 27,
      color: "red",
      value: 2,
      select: false,
      id: "twentySeven",
      index: 8
    },
    {
      number: 63,
      color: "green",
      value: 2,
      select: false,
      id: "greenSixtyThree",
      index: 9
    },
    {
      number: 11,
      color: "orange",
      value: 2,
      select: false,
      id: "eleven",
      index: 10
    },
    {
      number: 3,
      color: "red",
      value: 2,
      select: false,
      id: "three",
      index: 11
    },
    {
      number: 21,
      color: "blue",
      value: 2,
      select: false,
      id: "twentyOne",
      index: 12
    },
    {
      number: 81,
      color: "purple",
      value: 2,
      select: false,
      id: "eightyOne",
      index: 13
    },
    {
      number: 5,
      color: "green",
      value: 2,
      select: false,
      id: "five",
      index: 14
    },
    {
      number: 13,
      color: "green",
      value: 2,
      select: false,
      id: "thirteen",
      index: 15
    },
    {
      number: 15,
      color: "blue",
      value: 2,
      select: false,
      id: "blueFifteen",
      index: 16
    },
    {
      number: 9,
      color: "blue",
      value: 2,
      select: false,
      id: "nine",
      index: 17
    },
    {
      number: 45,
      color: "purple",
      value: 2,
      select: false,
      id: "fortyFive",
      index: 18
    },
    {
      number: 35,
      color: "green",
      value: 2,
      select: false,
      id: "greenThirtyFive",
      index: 19
    }
  ];
  select: boolean;
  computersShots: any[] = [];
  constructor(private draftService: DraftService) {}

  ngOnInit() {
    this.redP = this.draftService.redP;
    this.blueP = this.draftService.blueP;
    this.orangeP = this.draftService.orangeP;
    this.purpleP = this.draftService.purpleP;
    this.greenP = this.draftService.greenP;
    this.redC = this.draftService.redC;
    this.blueC = this.draftService.blueC;
    this.orangeC = this.draftService.orangeC;
    this.purpleC = this.draftService.purpleC;
    this.greenC = this.draftService.greenC;
    this.turn = this.draftService.passTurnDown();
  }
  startGame() {
    if (this.turn === false) {
      this.commentary =
        "The Game has started! You won the tip-off! You start with the ball!";
      // this.rollDice();
    } else {
      this.commentary =
        "The Game has started! The Computer won the tip-off! The Computer starts with the ball!";
      // this.computersTurn();
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
      this.final = `You lost, better luck next time! With a final score of ${this.playerScore} to ${this.computerScore} the computer was victorious! Congrats!`;
    }
  }
  changeTurn(): void {
    this.turn = !this.turn;
    // if ((this.turn = true)) {
    //   this.computersTurn();
    // }
  }
  findShot(form): void {
    // console.log(form);
    this.added = form.added;
    this.subtracted = form.subtracted;
    this.multiplied = form.multiplied;
    this.divided = form.divided;
    if (
      this.added === this.correctAdd &&
      this.subtracted === this.correctSub &&
      this.multiplied === this.correctTimes
    ) {
      this.highlightShots(
        this.added,
        this.subtracted,
        this.multiplied,
        this.divided
      );
      this.correct = true;
    } else {
      this.correct = false;
      this.commentary =
        "Nice try, but your answers weren't quite right. It's the other teams ball.";
      setTimeout(() => {
        this.changeTurn();
      }, 2000);
    }

    // this.highlightShots(
    //   this.added,
    //   this.subtracted,
    //   this.multiplied,
    //   this.divided
    // );
  }
  highlightShots(
    added: number,
    subtracted: number,
    multiplied: number,
    divided?: number
  ) {
    let openCounter: number = 0;
    if (this.turn === false) {
      this.evenNumbers.forEach(number => {
        if (number.number === added) {
          number.select = true;
          openCounter++;
        } else if (number.number === subtracted) {
          number.select = true;
          openCounter++;
        } else if (number.number === multiplied) {
          number.select = true;
          openCounter++;
        } else if (number.number === divided) {
          number.select = true;
          openCounter++;
        } else {
          number.select = false;
        }
      });
    } else {
      this.oddNumbers.forEach(number => {
        if (number.number === added) {
          number.select = true;
          openCounter++;
        } else if (number.number === subtracted) {
          number.select = true;
          openCounter++;
        } else if (number.number === multiplied) {
          number.select = true;
          openCounter++;
        } else if (number.number === divided) {
          number.select = true;
          openCounter++;
        } else {
          number.select = false;
        }
      });
    }
    if (openCounter === 0) {
      this.commentary = "Turnover! The ball goes back down the court!";
      setTimeout(() => {
        this.changeTurn();
      }, 500);
    }
  }

  rollDice(): void {
    this.correct = undefined;
    document.querySelector("form").reset();
    this.redDice = Math.floor(Math.random() * 10);
    this.blueDice = Math.floor(Math.random() * 10);
    this.correctAdd = this.redDice + this.blueDice;
    this.correctSub = Math.abs(this.redDice - this.blueDice);
    this.correctTimes = this.redDice * this.blueDice;
    if (this.redDice >= this.blueDice) {
      if (this.redDice % this.blueDice === 0) {
        this.isDivisible = true;
        this.correctDivide = this.redDice / this.blueDice;
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
    // console.log(`added = ${this.correctAdd}`);
    // console.log(`subtracted = ${this.correctSub}`);
    // console.log(`divided = ${this.correctDivide}`);
    // console.log(`multiplied= ${this.correctTimes}`);
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
    } else if (spot.color == "blue") {
      this.commentary = `${this.blueP.name} shoots for ${spot.value}!`;
      setTimeout(() => {
        if (spot.value === 3) {
          if (this.blueP.threepoint <= this.spin) {
            this.makeShot(this.blueP.name, spot.value, this.turn);
          } else {
            this.missShot(this.blueP.name);
          }
        } else {
          if (this.blueP.fieldgoal <= this.spin) {
            this.makeShot(this.blueP.name, spot.value, this.turn);
          } else {
            this.missShot(this.blueP.name);
          }
        }
      }, 1000);
    } else if (spot.color == "green") {
      this.commentary = `${this.greenP.name} shoots for ${spot.value}!`;
      setTimeout(() => {
        if (spot.value === 3) {
          if (this.greenP.threepoint <= this.spin) {
            this.makeShot(this.greenP.name, spot.value, this.turn);
          } else {
            this.missShot(this.greenP.name);
          }
        } else {
          if (this.greenP.fieldgoal <= this.spin) {
            this.makeShot(this.greenP.name, spot.value, this.turn);
          } else {
            this.missShot(this.greenP.name);
          }
        }
      }, 1000);
    } else if (spot.color == "purple") {
      this.commentary = `${this.purpleP.name} shoots for ${spot.value}!`;
      setTimeout(() => {
        if (spot.value === 3) {
          if (this.purpleP.threepoint <= this.spin) {
            this.makeShot(this.purpleP.name, spot.value, this.turn);
          } else {
            this.missShot(this.purpleP.name);
          }
        } else {
          if (this.purpleP.fieldgoal <= this.spin) {
            this.makeShot(this.purpleP.name, spot.value, this.turn);
          } else {
            this.missShot(this.purpleP.name);
          }
        }
      }, 1000);
    } else {
      this.commentary = `${this.redP.name} shoots for ${spot.value}!`;
      setTimeout(() => {
        if (spot.value === 3) {
          if (this.redP.threepoint <= this.spin) {
            this.makeShot(this.redP.name, spot.value, this.turn);
          } else {
            this.missShot(this.redP.name);
          }
        } else {
          if (this.redP.fieldgoal <= this.spin) {
            this.makeShot(this.redP.name, spot.value, this.turn);
          } else {
            this.missShot(this.redP.name);
          }
        }
      }, 1000);
    }
  }

  takeOddShot(i: number): void {
    let spot = this.evenNumbers[i];
    this.spin = Math.random() * 1;
    if (spot.color == "orange") {
      this.commentary = `${this.orangeC.name} shoots for ${spot.value}!`;
      setTimeout(() => {
        if (spot.value === 3) {
          if (this.orangeC.threepoint <= this.spin) {
            this.makeShot(this.orangeC.name, spot.value, this.turn);
          } else {
            this.missShot(this.orangeC.name);
          }
        } else {
          if (this.orangeC.fieldgoal <= this.spin) {
            this.makeShot(this.orangeC.name, spot.value, this.turn);
          } else {
            this.missShot(this.orangeC.name);
          }
        }
      }, 1000);
    } else if (spot.color == "blue") {
      this.commentary = `${this.blueC.name} shoots for ${spot.value}!`;
      setTimeout(() => {
        if (spot.value === 3) {
          if (this.blueC.threepoint <= this.spin) {
            this.makeShot(this.blueC.name, spot.value, this.turn);
          } else {
            this.missShot(this.blueC.name);
          }
        } else {
          if (this.blueC.fieldgoal <= this.spin) {
            this.makeShot(this.blueC.name, spot.value, this.turn);
          } else {
            this.missShot(this.blueC.name);
          }
        }
      }, 1000);
    } else if (spot.color == "green") {
      this.commentary = `${this.greenC.name} shoots for ${spot.value}!`;
      setTimeout(() => {
        if (spot.value === 3) {
          if (this.greenC.threepoint <= this.spin) {
            this.makeShot(this.greenC.name, spot.value, this.turn);
          } else {
            this.missShot(this.greenC.name);
          }
        } else {
          if (this.greenC.fieldgoal <= this.spin) {
            this.makeShot(this.greenC.name, spot.value, this.turn);
          } else {
            this.missShot(this.greenC.name);
          }
        }
      }, 1000);
    } else if (spot.color == "purple") {
      this.commentary = `${this.purpleC.name} shoots for ${spot.value}!`;
      setTimeout(() => {
        if (spot.value === 3) {
          if (this.purpleC.threepoint <= this.spin) {
            this.makeShot(this.purpleC.name, spot.value, this.turn);
          } else {
            this.missShot(this.purpleC.name);
          }
        } else {
          if (this.purpleC.fieldgoal <= this.spin) {
            this.makeShot(this.purpleC.name, spot.value, this.turn);
          } else {
            this.missShot(this.purpleC.name);
          }
        }
      }, 1000);
    } else {
      this.commentary = `${this.redC.name} shoots for ${spot.value}!`;
      setTimeout(() => {
        if (spot.value === 3) {
          if (this.redC.threepoint <= this.spin) {
            this.makeShot(this.redC.name, spot.value, this.turn);
          } else {
            this.missShot(this.redC.name);
          }
        } else {
          if (this.redC.fieldgoal <= this.spin) {
            this.makeShot(this.redC.name, spot.value, this.turn);
          } else {
            this.missShot(this.redC.name);
          }
        }
      }, 1000);
    }
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
    this.changeTurn();
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
    this.changeTurn();
  }
  computersTurn(): void {
    this.rollDice();
    setTimeout(() => {
      this.oddNumbers.forEach(number => {
        let openCounter = 0;
        if (number.number === this.correctAdd) {
          console.log(this.oddNumbers[number.index].playerName);
          // if (number.value === 3) {
          //   let newShot = {
          //     name: this.oddNumbers[number.index].playerName,
          //     per: this.oddNumbers[number.index].threepoint
          //   };
          //   this.computersShots.unshift(newShot);
          // } else {
          //   let newShot = {
          //     name: this.oddNumbers[number.index].playerName,
          //     per: this.oddNumbers[number.index].fieldgoal
          //   };
          //   this.computersShots.unshift(newShot);
          // }
          number.select = true;
          openCounter++;
        } else if (number.number === this.correctSub) {
          console.log();
          // if (number.value === 3) {
          //   let newShot:any = {
          //     name: this.oddNumbers[number.index].playerName,
          //     per: this.oddNumbers[number.index].threepoint
          //   };
          //   this.computersShots.unshift(newShot);
          // } else {
          //   let newShot:any = {
          //     name: this.oddNumbers[number.index].playerName,
          //     per: this.oddNumbers[number.index].fieldgoal
          //   };
          //   this.computersShots.unshift(newShot);
          // }
          number.select = true;
          openCounter++;
        } else if (number.number === this.correctTimes) {
          console.log(this.oddNumbers[number.index].playerName);
          // if (number.value === 3) {
          //   let newShot = {
          //     name: this.oddNumbers[number.index].playerName,
          //     per: this.oddNumbers[number.index].threepoint
          //   };
          //   this.computersShots.unshift(newShot);
          // } else {
          //   let newShot = {
          //     name: this.oddNumbers[number.index].playerName,
          //     per: this.oddNumbers[number.index].fieldgoal
          //   };
          //   this.computersShots.unshift(newShot);
          // }
          number.select = true;
          openCounter++;
        } else if (number.number === this.correctDivide) {
          console.log(this.oddNumbers[number.index].playerName);
          // if (number.value === 3) {
          //   let newShot = {
          //     name: this.oddNumbers[number.index].playerName,
          //     per: this.oddNumbers[number.index].threepoint
          //   };
          //   this.computersShots.unshift(newShot);
          // } else {
          //   let newShot = {
          //     name: this.oddNumbers[number.index].playerName,
          //     per: this.oddNumbers[number.index].fieldgoal
          //   };
          //   this.computersShots.unshift(newShot);
          // }
          number.select = true;
          openCounter++;
        } else {
          number.select = false;
        }
        // if (openCounter === 0) {
        //   // this.changeTurn();
        // }
        // console.log(this.computersShots);
      });
    }, 2000);
  }
}
