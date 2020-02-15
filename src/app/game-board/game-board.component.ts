import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { DraftService } from "./../services/draft.service";
import { CountdownComponent } from "ngx-countdown";
import { TouchSequence } from "selenium-webdriver";
// import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-game-board",
  templateUrl: "./game-board.component.html",
  styleUrls: ["./game-board.component.css"]
})
export class GameBoardComponent implements OnInit {
  @ViewChild("gameClock", { static: false })
  private gameClock: CountdownComponent;
  @ViewChild("playerShotClock", { static: false })
  private playerShotClock: CountdownComponent;
  spin: number;
  turn: boolean = true;
  start: boolean = false;
  end: boolean = false;
  redDice: number;
  blueDice: number;
  playerScore: number = 0;
  computerScore: number = 0;
  commentaryArray: any[] = ["The Game is about to begin!"];
  commentary: string;
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
  computersOpenShots: any[] = [];
  openShot: boolean;
  constructor(
    private draftService: DraftService // private cookieService: CookieService
  ) {}

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
  startGame(): void {
    if (this.turn === false) {
      this.commentary =
        "The Game has started! You won the tip-off! You start with the ball!";
      this.commentaryArray.unshift(this.commentary);
      this.rollDice();
    } else {
      this.commentary =
        "The Game has started! The Computer won the tip-off! The Computer starts with the ball!";
      this.commentaryArray.unshift(this.commentary);
      this.computersTurn();
    }
    this.start = true;
  }
  //
  endGame(): void {
    this.end = true;
    if (this.playerScore === this.computerScore) {
      this.final = `You tied ${this.playerScore} to ${this.computerScore}.  Some say it's like kissing your sibling.`;
    } else if (this.playerScore > this.computerScore) {
      this.final = `You won! With a final score of ${this.playerScore} to ${this.computerScore}! Congrats!`;
    } else {
      this.final = `You lost, better luck next time! With a final score of ${this.playerScore} to ${this.computerScore} the computer was victorious! Congrats!`;
    }
  }
  //
  changeTurn(): void {
    if (this.gameClock.i.value > 0) {
      setTimeout(() => {
        document.getElementById("oddHoop").style.background = "none";
        document.getElementById("oddHoop").style.zIndex = "0";
        document.getElementById("evenHoop").style.zIndex = "0";
        document.getElementById("evenHoop").style.background = "none";
        this.turn = !this.turn;
        if (this.turn === true) {
          this.commentary = `The computer has the ball!`;
          this.commentaryArray.unshift(this.commentary);
          this.computersTurn();
        } else {
          this.commentary = `You have the ball!`;
          this.commentaryArray.unshift(this.commentary);
          this.rollDice();
        }
      }, 1000);
    } else {
      this.endGame();
    }
  }
  //
  findShot(form): void {
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
      this.commentaryArray.unshift(this.commentary);
      setTimeout(() => {
        this.changeTurn();
      }, 2000);
    }
  }
  //
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
        if (
          number.number === added ||
          number.number === subtracted ||
          number.number === multiplied ||
          number.number === divided
        ) {
          this.computersShots.unshift(this.oddNumbers[number.index]);
          number.select = true;
          openCounter++;
        } else {
          number.select = false;
        }
      });
    }
    if (openCounter === 0) {
      this.commentary = "Turnover!";
      this.commentaryArray.unshift(this.commentary);
      this.openShot = false;
      setTimeout(() => {
        this.changeTurn();
      }, 2000);
    } else {
      this.openShot = true;
    }
  }
  //
  rollDice(): void {
    this.correct = undefined;
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
        this.correctDivide = undefined;
      }
    } else {
      if (this.blueDice % this.redDice === 0) {
        this.correctDivide = this.blueDice / this.redDice;
      } else {
        this.isDivisible = false;
        this.correctDivide = undefined;
      }
    }
    this.evenNumbers.forEach(number => {
      number.select = false;
    });
    this.oddNumbers.forEach(numbers => {
      numbers.select = false;
    });
  }
  //
  takeEvenShot(i: number): void {
    let spot = this.evenNumbers[i];
    if (this.playerShotClock.i.value > 0) {
      if (spot.color == "orange") {
        if (spot.value === 3) {
          let shooter = {
            playerName: this.orangeP.playerName,
            per: this.orangeP.fieldGoal,
            index: i,
            points: 3
          };
          this.takeShot(shooter);
        } else {
          let shooter = {
            playerName: this.orangeP.playerName,
            per: this.orangeP.fieldGoal,
            index: i,
            points: 2
          };
          this.takeShot(shooter);
        }
      } else if (spot.color == "blue") {
        if (spot.value === 3) {
          let shooter = {
            playerName: this.blueP.playerName,
            per: this.blueP.fieldGoal,
            index: i,
            points: 3
          };
          this.takeShot(shooter);
        } else {
          let shooter = {
            playerName: this.blueP.playerName,
            per: this.blueP.fieldGoal,
            index: i,
            points: 2
          };
          this.takeShot(shooter);
        }
      } else if (spot.color == "red") {
        if (spot.value === 3) {
          let shooter = {
            playerName: this.redP.playerName,
            per: this.redP.fieldGoal,
            index: i,
            points: 3
          };
          this.takeShot(shooter);
        } else {
          let shooter = {
            playerName: this.redP.playerName,
            per: this.redP.fieldGoal,
            index: i,
            points: 2
          };
          this.takeShot(shooter);
        }
      } else if (spot.color == "purple") {
        if (spot.value === 3) {
          let shooter = {
            playerName: this.purpleP.playerName,
            per: this.purpleP.fieldGoal,
            index: i,
            points: 3
          };
          this.takeShot(shooter);
        } else {
          let shooter = {
            playerName: this.purpleP.playerName,
            per: this.purpleP.fieldGoal,
            index: i,
            points: 2
          };
          this.takeShot(shooter);
        }
      } else {
        let shooter = {
          playerName: this.greenP.playerName,
          per: this.greenP.fieldGoal,
          index: i,
          points: 2
        };
        this.takeShot(shooter);
      }
    } else {
      this.commentary = "SHOT CLOCK VIOLATION!";
      this.commentaryArray.unshift(this.commentary);
      this.changeTurn();
    }
  }
  //
  computersTurn(): void {
    this.computersShots = [];
    this.computersOpenShots = [];
    this.rollDice();
    this.highlightShots(
      this.correctAdd,
      this.correctSub,
      this.correctTimes,
      this.correctDivide
    );
    if (this.openShot === true) {
      setTimeout(() => {
        this.computersShots.forEach(number => {
          if (number.value === 3) {
            if (number.color === "red") {
              let newShot = {
                playerName: this.redC.playerName,
                per: this.redC.threePoint,
                index: number.index,
                points: 3
              };
              this.computersOpenShots.unshift(newShot);
            } else if (number.color === "orange") {
              let newShot = {
                playerName: this.orangeC.playerName,
                per: this.orangeC.threePoint,
                index: number.index,
                points: 3
              };
              this.computersOpenShots.unshift(newShot);
            } else if (number.color === "purple") {
              let newShot = {
                playerName: this.purpleC.playerName,
                per: this.purpleC.threePoint,
                index: number.index,
                points: 3
              };
              this.computersOpenShots.unshift(newShot);
            } else {
              let newShot = {
                playerName: this.blueC.playerName,
                per: this.blueC.threePoint,
                index: number.index,
                points: 3
              };
              this.computersOpenShots.unshift(newShot);
            }
          } else {
            if (number.color === "red") {
              let newShot = {
                playerName: this.redC.playerName,
                per: this.redC.fieldGoal,
                index: number.index,
                points: 2
              };
              this.computersOpenShots.unshift(newShot);
            } else if (number.color === "orange") {
              let newShot = {
                playerName: this.orangeC.playerName,
                per: this.orangeC.fieldGoal,
                index: number.index,
                points: 2
              };
              this.computersOpenShots.unshift(newShot);
            } else if (number.color === "purple") {
              let newShot = {
                playerName: this.purpleC.playerName,
                per: this.purpleC.fieldGoal,
                index: number.index,
                points: 2
              };
              this.computersOpenShots.unshift(newShot);
            } else if (number.color === "blue") {
              let newShot = {
                playerName: this.blueC.playerName,
                per: this.blueC.fieldGoal,
                index: number.index,
                points: 2
              };
              this.computersOpenShots.unshift(newShot);
            } else {
              let newShot = {
                playerName: this.greenC.playerName,
                per: this.greenC.fieldGoal,
                index: number.index,
                points: 2
              };
              this.computersOpenShots.unshift(newShot);
            }
          }
        });
        this.sortOpenShots();
      }, 5000);
    }
  }
  //
  sortOpenShots() {
    this.computersOpenShots.sort((a, b) => {
      return b.per - a.per;
    });
    if (this.computersOpenShots.length >= 1) {
      let index = this.computersOpenShots[0].index;
      setTimeout(() => {
        this.takeShot(this.computersOpenShots[0]);
      }, 1000);
    }
  }
  //
  takeShot(player: any): void {
    if (this.gameClock.i.value === 0) {
      this.endGame();
    } else {
      this.commentary = `${player.playerName} shoots for ${player.points}!`;
      this.commentaryArray.unshift(this.commentary);
      this.spin = Math.random() * 1;
      this.shotBasketball(player.index);
      setTimeout(() => {
        if (this.spin <= player.per) {
          this.makeBasketball(player);
        } else {
          this.doinkBasketball(player);
        }
      }, 1700);
    }
  }
  //
  shotBasketball(i: number) {
    if (this.turn === false) {
      let id = this.evenNumbers[i].id;
      let spotLeft = document.getElementById(id).offsetLeft;
      let spotTop = document.getElementById(id).offsetTop;
      document.getElementById("evenBall").style.left = `${spotLeft}px`;
      document.getElementById("evenBall").style.top = `${spotTop}px`;
      document.getElementById("evenBall").style.transition = ".5s";
    } else {
      let id = this.oddNumbers[i].id;
      let spotLeft = document.getElementById(id).offsetLeft;
      let spotTop = document.getElementById(id).offsetTop;
      document.getElementById("oddBall").style.left = `${spotLeft}px`;
      document.getElementById("oddBall").style.top = `${spotTop}px`;
      document.getElementById("oddBall").style.transition = ".5s";
    }
  }
  //
  makeBasketball(player: any): void {
    if (this.turn === false) {
      document.getElementById("evenBall").style.left = `14%`;
      document.getElementById("evenBall").style.top = `49.5%`;
      document.getElementById("evenBall").style.transition = "1s";
      document.getElementById("evenBall").style.transform = "rotate(720deg)";
    } else {
      document.getElementById("oddBall").style.left = `81%`;
      document.getElementById("oddBall").style.top = `49.5%`;
      document.getElementById("oddBall").style.transition = "1s";
      document.getElementById("oddBall").style.transform = "rotate(-720deg)";
    }
    setTimeout(() => {
      this.makeShot(player.playerName, player.points, this.turn);
    }, 1000);
  }
  //
  doinkBasketball(player: any): void {
    if (this.turn === false) {
      document.getElementById("evenBall").style.left = `17%`;
      document.getElementById("evenBall").style.top = `49%`;
      document.getElementById("evenBall").style.transition = "1s";
      document.getElementById("evenBall").style.transform = "rotate(720deg)";
    } else {
      document.getElementById("oddBall").style.left = `78%`;
      document.getElementById("oddBall").style.top = `49%`;
      document.getElementById("oddBall").style.transition = "1s";
      document.getElementById("oddBall").style.transform = "rotate(-720deg)";
    }
    setTimeout(() => {
      let randomLeft = Math.floor(Math.random() * (81 - 14) + 14);
      let randomTop = Math.floor(Math.random() * (75 - 25) + 14);
      if (this.turn === false) {
        document.getElementById("evenBall").style.left = `${randomLeft}%`;
        document.getElementById("evenBall").style.top = `${randomTop}%`;
        document.getElementById("evenBall").style.transition = "1s";
        document.getElementById("evenBall").style.transform = "rotate(361deg)";
      } else {
        document.getElementById("oddBall").style.left = `${randomLeft}%`;
        document.getElementById("oddBall").style.top = `${randomTop}%`;
        document.getElementById("oddBall").style.transition = "1s";
        document.getElementById("oddBall").style.transform = "rotate(-361deg)";
      }
    }, 1000);
    setTimeout(() => {
      this.missShot(player.playerName);
    }, 1000);
  }
  //function for if the shooting percentage is equal to or lower than the random spin, updates score, then send to the changeTurn function
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
      this.commentaryArray.unshift(this.commentary);
      this.computerScore += points;
      document.getElementById("oddHoop").style.background = "green";
      document.getElementById("oddHoop").style.zIndex = "1";
    } else {
      this.commentary = stories[randomInt];
      this.playerScore += points;
      document.getElementById("evenHoop").style.background = "green";
      document.getElementById("evenHoop").style.zIndex = "1";
    }
    this.changeTurn();
  }
  //
  missShot(name: string) {
    let stories: string[] = [
      `That was a terrible miss by ${name}! Not a good shot!`,
      `${name} with the miss! You can hear the crowd chanting "Air-Ball, Air-Ball"! Not a nice place to play!`,
      `${name} with the miss, and the ball is going the other way!`,
      `Really tough miss there for ${name}, unlucky.`,
      `Strong defense there to prevent the shot from ${name}`
    ];
    let randomInt: number = Math.floor(Math.random() * stories.length);
    this.commentary = stories[randomInt];
    this.commentaryArray.unshift(this.commentary);
    if (this.turn === true) {
      document.getElementById("oddHoop").style.background = "red";
    } else {
      document.getElementById("evenHoop").style.background = "red";
    }
    this.changeTurn();
  }
}
