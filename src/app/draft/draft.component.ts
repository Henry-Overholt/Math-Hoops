import { Component, OnInit } from "@angular/core";
import { DraftService } from "./../services/draft.service";

@Component({
  selector: "app-draft",
  templateUrl: "./draft.component.html",
  styleUrls: ["./draft.component.css"]
})
export class DraftComponent implements OnInit {
  turn: boolean;
  randomInt: number;
  whoseTurn: string;
  start: boolean = false;
  end: boolean = false;
  bluePlayers: any[] = [];
  orangePlayers: any[] = [];
  redPlayers: any[] = [];
  greenPlayers: any[] = [];
  purplePlayers: any[] = [];
  playersTeam: any[] = [];
  computersTeam: any[] = [];
  showBlue: boolean = true;
  showRed: boolean = false;
  showGreen: boolean = false;
  showOrange: boolean = false;
  showPurple: boolean = false;
  yesBlue: boolean = false;
  yesGreen: boolean = false;
  yesOrange: boolean = false;
  yesPurple: boolean = false;
  yesRed: boolean = false;
  showStats: boolean;
  timer: number;

  constructor(private draftService: DraftService) {}

  ngOnInit() {
    this.bluePlayers = this.draftService.bluePlayers;
    this.orangePlayers = this.draftService.orangePlayers;
    this.redPlayers = this.draftService.redPlayers;
    this.purplePlayers = this.draftService.purplePlayers;
    this.greenPlayers = this.draftService.greenPlayers;
  }
  computerTurn(): void {
    //runs the computer's draft choices
    this.randomInt = Math.floor(Math.random() * 11);
    if (this.computersTeam.length === 0) {
      setTimeout(() => {
        this.draftService.setOrangeC(this.orangePlayers[this.randomInt]);
        this.computersTeam.unshift(this.orangePlayers[this.randomInt]);
        this.whoseTurn = `The computer drafted ${
          this.orangePlayers[this.randomInt].playername
        }! You are on the clock!`;
        this.orangePlayers.splice(this.randomInt, 1);
        this.changeTurn();
      }, 5000);
    } else if (this.computersTeam.length === 1) {
      setTimeout(() => {
        this.computersTeam.unshift(this.redPlayers[this.randomInt]);
        this.draftService.setRedC(this.redPlayers[this.randomInt]);
        this.whoseTurn = `The computer drafted ${
          this.redPlayers[this.randomInt].playername
        }! You are on the clock!`;
        this.redPlayers.splice(this.randomInt, 1);
        this.changeTurn();
      }, 5000);
    } else if (this.computersTeam.length === 2) {
      setTimeout(() => {
        this.computersTeam.unshift(this.bluePlayers[this.randomInt]);
        this.draftService.setBlueC(this.bluePlayers[this.randomInt]);
        this.whoseTurn = `The computer drafted ${
          this.bluePlayers[this.randomInt].playername
        }! You are on the clock!`;
        this.bluePlayers.splice(this.randomInt, 1);
        this.changeTurn();
      }, 5000);
    } else if (this.computersTeam.length === 3) {
      setTimeout(() => {
        this.computersTeam.unshift(this.greenPlayers[this.randomInt]);
        this.draftService.setGreenC(this.greenPlayers[this.randomInt]);
        this.whoseTurn = `The computer drafted ${
          this.greenPlayers[this.randomInt].playername
        }! You are on the clock!`;
        this.greenPlayers.splice(this.randomInt, 1);
        this.changeTurn();
      }, 5000);
    } else if (this.computersTeam.length === 4) {
      setTimeout(() => {
        this.computersTeam.unshift(this.purplePlayers[this.randomInt]);
        this.draftService.setPurpleC(this.purplePlayers[this.randomInt]);
        this.whoseTurn = `The computer drafted ${
          this.purplePlayers[this.randomInt].playername
        }! You are on the clock!`;
        this.purplePlayers.splice(this.randomInt, 1);
        this.endGame();
      }, 5000);
    } else {
      this.end = true;
    }
  }
  endGame(): void {
    if (this.playersTeam.length >= 5 && this.computersTeam.length >= 5) {
      this.end = true;
    } else {
      this.changeTurn();
    }
  }
  flipCoin(): void {
    //randomly picks between 0 and 1; 1 equals computer; 0 equals player;
    this.randomInt = Math.floor(Math.random() * 2);
    if (this.randomInt === 1) {
      this.turn = true;
      this.whoseTurn = "The computer picks First!";
      this.computerTurn();
    } else {
      this.turn = false;
      this.whoseTurn = "You pick First!";
    }
    this.start = true;
    this.draftService.setTurn(!this.turn);
  }
  changeTurn(): void {
    this.turn = !this.turn;
    console.log(this.turn);
  }
  handleBlue(): void {
    this.showBlue = true;
    this.showRed = false;
    this.showOrange = false;
    this.showGreen = false;
    this.showPurple = false;
  }
  handleGreen(): void {
    this.showBlue = false;
    this.showRed = false;
    this.showOrange = false;
    this.showGreen = true;
    this.showPurple = false;
  }
  handleRed(): void {
    this.showBlue = false;
    this.showRed = true;
    this.showOrange = false;
    this.showGreen = false;
    this.showPurple = false;
  }
  handleOrange(): void {
    this.showBlue = false;
    this.showRed = false;
    this.showOrange = true;
    this.showGreen = false;
    this.showPurple = false;
  }
  handlePurple(): void {
    this.showBlue = false;
    this.showRed = false;
    this.showOrange = false;
    this.showGreen = false;
    this.showPurple = true;
  }
  draftBlue(i: number): void {
    if (this.start === true) {
      this.yesBlue = true;
      this.endGame();
      this.playersTeam.unshift(this.bluePlayers[i]);
      this.whoseTurn = `You drafted ${this.bluePlayers[i].playername}! The computer is on the clock!`;
      this.draftService.setBlueP(this.bluePlayers[i]);
      this.bluePlayers.splice(i, 1);
      this.computerTurn();
    } //only on player's turn the button will show;
  }
  draftGreen(i: number): void {
    if (this.start === true) {
      this.yesGreen = true;
      this.endGame();
      this.playersTeam.unshift(this.greenPlayers[i]);
      this.whoseTurn = `You drafted ${this.greenPlayers[i].playername}! The computer is on the clock!`;
      this.draftService.setGreenP(this.greenPlayers[i]);
      this.greenPlayers.splice(i, 1);
      this.computerTurn();
    }
  }
  draftRed(i: number): void {
    if (this.start === true) {
      this.yesRed = true;
      this.endGame();
      this.playersTeam.unshift(this.redPlayers[i]);
      this.whoseTurn = `You drafted ${this.redPlayers[i].playername}! The computer is on the clock!`;
      this.draftService.setRedP(this.redPlayers[i]);
      this.redPlayers.splice(i, 1);
      this.computerTurn();
    }
  }
  draftOrange(i: number): void {
    if (this.start === true) {
      this.endGame();
      this.yesOrange = true;
      this.playersTeam.unshift(this.orangePlayers[i]);
      this.whoseTurn = `You drafted ${this.orangePlayers[i].playername}! The computer is on the clock!`;
      this.draftService.setOrangeP(this.orangePlayers[i]);
      this.orangePlayers.splice(i, 1);
      this.computerTurn();
    }
  }
  draftPurple(i: number): void {
    if (this.start === true) {
      this.yesPurple = true;
      this.endGame();
      this.playersTeam.unshift(this.purplePlayers[i]);
      this.whoseTurn = `You drafted ${this.purplePlayers[i].playername}! The computer is on the clock!`;
      this.draftService.setPurpleP(this.purplePlayers[i]);
      this.purplePlayers.splice(i, 1);
      this.computerTurn();
    }
  }
}
