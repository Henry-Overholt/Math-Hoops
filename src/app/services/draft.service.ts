import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DraftService {
  redP: object; //player's red player
  blueP: object; //player's blue player
  orangeP: object; //player's orange player
  purpleP: object; //player's purple player
  greenP: object; //player's green player
  redC: object; //computer's red player
  blueC: object; //computer's blue player
  orangeC: object; //computer's orange player
  purpleC: object; //computer's purple player
  greenC: object; //computer's green player
  turn: boolean;
  constructor(private http: HttpClient) {}
  //return all the players with a param of the different colors;
  getPlayers(color: string): Observable<any> {
    const params = new HttpParams().set("color", color);
    return this.http.get("http://localhost:7000/players", { params });
  }
  setTurn(turn: boolean): void {
    this.turn = turn;
  }
  passTurnDown(): boolean {
    return this.turn;
  }
  //gets players from draft component
  setRedP(player: object): void {
    this.redP = player;
  }
  setBlueP(player: object): void {
    this.blueP = player;
  }
  setGreenP(player: object): void {
    this.greenP = player;
  }
  setOrangeP(player: object): void {
    this.orangeP = player;
  }
  setPurpleP(player: object): void {
    this.purpleP = player;
  }
  setRedC(player: object): void {
    this.redC = player;
  }
  setBlueC(player: object): void {
    this.blueC = player;
  }
  setOrangeC(player: object): void {
    this.orangeC = player;
  }
  setGreenC(player: object): void {
    this.greenC = player;
  }
  setPurpleC(player: object): void {
    this.purpleC = player;
  }
  //send players to game
  getRedP(): any {
    return this.redP;
  }
  getBlueP(): any {
    return this.blueP;
  }
  getGreenP(): any {
    return this.greenP;
  }
  getOrangeP(): any {
    return this.orangeP;
  }
  getPurpleP(): any {
    return this.purpleP;
  }
  getRedC(): any {
    return this.redC;
  }
  getBlueC(): any {
    return this.blueC;
  }
  getOrangeC(): any {
    return this.orangeC;
  }
  getGreenC(): any {
    return this.greenC;
  }
  getPurpleC(): any {
    return this.purpleC;
  }
}
