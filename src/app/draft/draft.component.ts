import { Component, OnInit, ViewChild } from "@angular/core";
import { DraftService } from "./../services/draft.service";
import { CountdownComponent } from "ngx-countdown";
// import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-draft",
  templateUrl: "./draft.component.html",
  styleUrls: ["./draft.component.css"]
})
export class DraftComponent implements OnInit {
  @ViewChild("draftClock", { static: false })
  private draftClock: CountdownComponent;
  turn: boolean;
  randomInt: number;
  whoseTurn: string;
  commentary: any[] = [];
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

  constructor(
    private draftService: DraftService // private cookieService: CookieService
  ) {}

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
        // this.cookieService.set("orangeC", this.orangePlayers[this.randomInt]);
        this.computersTeam.unshift(this.orangePlayers[this.randomInt]);
        this.announceDraft(this.orangePlayers[this.randomInt].playerName, true);
        // this.whoseTurn = `The computer drafted ${
        //   this.orangePlayers[this.randomInt].playername
        // }! You are on the clock!`;
        this.orangePlayers.splice(this.randomInt, 1);
        this.changeTurn();
      }, 5000);
    } else if (this.computersTeam.length === 1) {
      setTimeout(() => {
        this.computersTeam.unshift(this.redPlayers[this.randomInt]);
        // this.cookieService.set("redC", this.redPlayers[this.randomInt]);
        this.draftService.setRedC(this.redPlayers[this.randomInt]);
        this.announceDraft(this.redPlayers[this.randomInt].playerName, true);
        // this.whoseTurn = `The computer drafted ${
        //   this.redPlayers[this.randomInt].playername
        // }! You are on the clock!`;
        this.redPlayers.splice(this.randomInt, 1);
        this.changeTurn();
      }, 5000);
    } else if (this.computersTeam.length === 2) {
      setTimeout(() => {
        this.computersTeam.unshift(this.bluePlayers[this.randomInt]);
        // this.cookieService.set("blueC", this.bluePlayers[this.randomInt]);
        this.draftService.setBlueC(this.bluePlayers[this.randomInt]);
        this.announceDraft(this.bluePlayers[this.randomInt].playerName, true);
        // this.whoseTurn = `The computer drafted ${
        //   this.bluePlayers[this.randomInt].playername
        // }! You are on the clock!`;
        this.bluePlayers.splice(this.randomInt, 1);
        this.changeTurn();
      }, 5000);
    } else if (this.computersTeam.length === 3) {
      setTimeout(() => {
        this.computersTeam.unshift(this.greenPlayers[this.randomInt]);
        // this.cookieService.set("greenC", this.greenPlayers[this.randomInt]);
        this.draftService.setGreenC(this.greenPlayers[this.randomInt]);
        this.announceDraft(this.greenPlayers[this.randomInt].playerName, true);
        // this.whoseTurn = `The computer drafted ${
        //   this.greenPlayers[this.randomInt].playername
        // }! You are on the clock!`;
        this.greenPlayers.splice(this.randomInt, 1);
        this.changeTurn();
      }, 5000);
    } else if (this.computersTeam.length === 4) {
      setTimeout(() => {
        this.computersTeam.unshift(this.purplePlayers[this.randomInt]);
        // this.cookieService.set("purpleC", this.purplePlayers[this.randomInt]);
        this.draftService.setPurpleC(this.purplePlayers[this.randomInt]);
        this.announceDraft(this.purplePlayers[this.randomInt].playerName, true);
        // this.whoseTurn = `The computer drafted ${
        //   this.purplePlayers[this.randomInt].playername
        // }! You are on the clock!`;
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
      let commentary = "The computer picks First!";
      this.commentary.unshift(commentary);
      this.computerTurn();
    } else {
      this.turn = false;
      let commentary = "You pick First!";
      this.commentary.unshift(commentary);
    }
    this.start = true;
    this.draftService.setTurn(!this.turn);
  }
  announceDraft(player: string, turn: boolean): void {
    if (turn === true) {
      let commentary = `The computer drafted ${player}! You are now on the clock!`;
      this.commentary.unshift(commentary);
    } else {
      let commentary = `You drafted ${player}! The computer is now on the clock!`;
      this.commentary.unshift(commentary);
    }
  }
  changeTurn(): void {
    this.draftClock.restart();
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
      // this.cookieService.set("blueP", this.bluePlayers[this.randomInt]);
      this.announceDraft(this.bluePlayers[i].playerName, false);
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
      // this.cookieService.set("greenP", this.greenPlayers[this.randomInt]);
      this.announceDraft(this.greenPlayers[i].playerName, false);
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
      // this.cookieService.set("redP", this.redPlayers[this.randomInt]);
      this.announceDraft(this.redPlayers[i].playerName, false);
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
      // this.cookieService.set("orangeP", this.orangePlayers[this.randomInt]);
      this.announceDraft(this.orangePlayers[i].playerName, false);
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
      // this.cookieService.set("purpleP", this.purplePlayers[this.randomInt]);
      this.announceDraft(this.purplePlayers[i].playerName, false);
      this.draftService.setPurpleP(this.purplePlayers[i]);
      this.purplePlayers.splice(i, 1);
      this.computerTurn();
    }
  }
}
