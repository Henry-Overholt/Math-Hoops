import { Component, OnInit } from "@angular/core";
import { DraftService } from "./../services/draft.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  players: any[] = this.draftService.allPlayers;
  fieldGoalPlayers: any[] = [];
  topFiveFieldPlayers: any[];
  threePointPlayers: any[] = [];
  topFiveThreePointPlayers: any[] = [];
  constructor(private draftService: DraftService) {}

  ngOnInit() {
    this.getFieldGoal();
    this.getThreePoint();
  }
  getFieldGoal() {
    this.fieldGoalPlayers = this.players.sort((a, b) =>
      a.fieldGoal < b.fieldGoal ? 1 : -1
    );
    this.topFiveFieldPlayers = [
      this.fieldGoalPlayers[0],
      this.fieldGoalPlayers[1],
      this.fieldGoalPlayers[2],
      this.fieldGoalPlayers[3],
      this.fieldGoalPlayers[4],
    ];
    console.log(this.topFiveFieldPlayers);
  }
  getThreePoint() {
    this.threePointPlayers = this.players.sort((a, b) =>
      a.threePoint < b.threePoint ? 1 : -1
    );
    this.topFiveThreePointPlayers = [
      this.threePointPlayers[0],
      this.threePointPlayers[1],
      this.threePointPlayers[2],
      this.threePointPlayers[3],
      this.threePointPlayers[4],
    ];
    console.log(this.topFiveThreePointPlayers);
  }
  goToLink(url: string) {
    window.open(url, "_blank");
  }
}
