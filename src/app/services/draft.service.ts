import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DraftService {
  redP: object = {
    playerName: "James Harden",
    color: "red",
    fieldGoal: 0.442,
    threePoint: 0.368,
    freeThrow: 0.879,
    number: 13,
    team: "Houston Rockets"
  }; //player's red player
  blueP: object = {
    playerName: "Kevin Durant",
    color: "blue",
    fieldGoal: 0.521,
    threePoint: 0.353,
    freeThrow: 0.885,
    number: 7,
    team: "Brooklyn Nets"
  }; //player's blue player
  orangeP: object = {
    playerName: "Alysha Clark",
    color: "orange",
    fieldGoal: 0.481,
    threePoint: 0.481,
    freeThrow: 0.818,
    number: 32,
    team: "Seattle Storm"
  }; //player's orange player
  purpleP: object = {
    playerName: "Leilani Mitchell",
    color: "purple",
    fieldGoal: 0.441,
    threePoint: 0.43,
    freeThrow: 0.82,
    number: 5,
    team: "Phoenix Mercury"
  }; //player's purple player
  greenP: object = {
    playerName: "Hassan Whiteside",
    color: "green",
    fieldGoal: 0.571,
    threePoint: 0.125,
    freeThrow: 0.593,
    number: 21,
    team: "Portland Trailblazers"
  }; //player's green player
  redC: object = {
    playerName: "Chris Paul",
    color: "red",
    fieldGoal: 0.419,
    threePoint: 0.358,
    freeThrow: 0.862,
    number: 3,
    team: "Oklahoma City Thunder"
  }; //computer's red player
  blueC: object = {
    playerName: "Karl-Anthony Towns",
    color: "blue",
    fieldGoal: 0.518,
    threePoint: 0.4,
    freeThrow: 0.836,
    number: 35,
    team: "Minnesota Timberwolves"
  }; //computer's blue player
  orangeC: object = {
    playerName: "Jewell Loyd",
    color: "orange",
    fieldGoal: 0.391,
    threePoint: 0.337,
    freeThrow: 0.928,
    number: 24,
    team: "Seattle Storm"
  }; //computer's orange player
  purpleC: object = {
    playerName: "Blake Griffin",
    color: "purple",
    fieldGoal: 0.462,
    threePoint: 0.362,
    freeThrow: 0.753,
    number: 23,
    team: "Detroit Pistons"
  }; //computer's purple player
  greenC: object = {
    playerName: "Chiney Ogwumike",
    color: "green",
    fieldGoal: 0.494,
    threePoint: 0.25,
    freeThrow: 0.809,
    number: 13,
    team: "Los Angeles Sparks"
  }; //computer's green player
  turn: boolean = false;
  bluePlayers: any[] = [
    {
      playerName: "Kevin Durant",
      color: "blue",
      fieldGoal: 0.521,
      threePoint: 0.353,
      freeThrow: 0.885,
      number: 7,
      team: "Brooklyn Nets"
    },
    {
      playerName: "Karl-Anthony Towns",
      color: "blue",
      fieldGoal: 0.518,
      threePoint: 0.4,
      freeThrow: 0.836,
      number: 35,
      team: "Minnesota Timberwolves"
    },
    {
      playerName: "Lebron James",
      color: "blue",
      fieldGoal: 0.51,
      threePoint: 0.339,
      freeThrow: 0.665,
      number: 6,
      team: "Los Angeles Lakers"
    },
    {
      playerName: "Tobias Harris",
      color: "blue",
      fieldGoal: 0.469,
      threePoint: 0.326,
      freeThrow: 0.841,
      number: 33,
      team: "Philadelphia 76ers"
    },
    {
      playerName: "Danilo Gallinari",
      color: "blue",
      fieldGoal: 0.463,
      threePoint: 0.433,
      freeThrow: 0.904,
      number: 8,
      team: "Oklahoma City Thunder"
    },
    {
      playerName: "Jabari Parker",
      color: "blue",
      fieldGoal: 0.493,
      threePoint: 0.313,
      freeThrow: 0.712,
      number: 12,
      team: "Atlanta Hawks"
    },
    {
      playerName: "Essence Carson",
      color: "blue",
      fieldGoal: 0.352,
      threePoint: 0.341,
      freeThrow: 0.784,
      number: 17,
      team: "Phoenix Mercury"
    },
    {
      playerName: "Tina Charles",
      color: "blue",
      fieldGoal: 0.389,
      threePoint: 0.186,
      freeThrow: 0.812,
      number: 31,
      team: "New York Liberty"
    },
    {
      playerName: "Paul George",
      color: "blue",
      fieldGoal: 0.438,
      threePoint: 0.386,
      freeThrow: 0.839,
      number: 13,
      team: "Los Angeles Clippers"
    },
    {
      playerName: "Allie Quigley",
      color: "blue",
      fieldGoal: 0.493,
      threePoint: 0.442,
      freeThrow: 0.87,
      number: 14,
      team: "Chicago Sky"
    },
    {
      playerName: "Breanna Stewart",
      color: "blue",
      fieldGoal: 0.529,
      threePoint: 0.415,
      freeThrow: 0.82,
      number: 30,
      team: "Seattle Storm"
    },
    {
      playerName: "Elena Delle Donne",
      color: "blue",
      fieldGoal: 0.515,
      threePoint: 0.43,
      freeThrow: 0.82,
      number: 11,
      team: "Washington Mystics"
    },
    {
      playerName: "Rebecca Allen",
      color: "blue",
      fieldGoal: 0.417,
      threePoint: 0.426,
      freeThrow: 0.813,
      number: 9,
      team: "New York Liberty"
    }
  ];
  orangePlayers: any[] = [
    {
      playerName: "Alysha Clark",
      color: "orange",
      fieldGoal: 0.481,
      threePoint: 0.481,
      freeThrow: 0.818,
      number: 32,
      team: "Seattle Storm"
    },
    {
      playerName: "Jewell Loyd",
      color: "orange",
      fieldGoal: 0.391,
      threePoint: 0.337,
      freeThrow: 0.928,
      number: 24,
      team: "Seattle Storm"
    },
    {
      playerName: "Kemba Walker",
      color: "orange",
      fieldGoal: 0.434,
      threePoint: 0.337,
      freeThrow: 0.844,
      number: 15,
      team: "Boston Celtics"
    },
    {
      playerName: "Jordan Clarkson",
      color: "orange",
      fieldGoal: 0.448,
      threePoint: 0.324,
      freeThrow: 0.844,
      number: 8,
      team: "Cleveland Cavaliers"
    },
    {
      playerName: "Klay Thompson",
      color: "orange",
      fieldGoal: 0.467,
      threePoint: 0.402,
      freeThrow: 0.816,
      number: 11,
      team: "Golden State Warriors"
    },
    {
      playerName: "Lonzo Ball",
      color: "orange",
      fieldGoal: 0.406,
      threePoint: 0.329,
      freeThrow: 0.816,
      number: 2,
      team: "New Orleans Pelicans"
    },
    {
      playerName: "Devin Booker",
      color: "orange",
      fieldGoal: 0.467,
      threePoint: 0.326,
      freeThrow: 0.866,
      number: 1,
      team: "Phoenix Suns"
    },
    {
      playerName: "Eric Bledsoe",
      color: "orange",
      fieldGoal: 0.467,
      threePoint: 0.326,
      freeThrow: 0.75,
      number: 6,
      team: "Milwaukee Bucks"
    },
    {
      playerName: "Ben Simmons",
      color: "orange",
      fieldGoal: 0.58,
      threePoint: 0.4,
      freeThrow: 0.582,
      number: 25,
      team: "Philadelphia 76ers"
    },
    {
      playerName: "Zach LaVine",
      color: "orange",
      fieldGoal: 0.467,
      threePoint: 0.374,
      freeThrow: 0.824,
      number: 8,
      team: "Chicago Bulls"
    },
    {
      playerName: "Diana Taurasi",
      color: "orange",
      fieldGoal: 0.446,
      threePoint: 0.383,
      freeThrow: 0.925,
      number: 3,
      team: "Phoenix Mercury"
    },
    {
      playerName: "Stephen Curry",
      color: "orange",
      fieldGoal: 0.472,
      threePoint: 0.437,
      freeThrow: 0.916,
      number: 30,
      team: "Golden State Warriors"
    },
    {
      playerName: "Isaiah Thomas",
      color: "orange",
      fieldGoal: 0.343,
      threePoint: 0.279,
      freeThrow: 0.63,
      number: 0,
      team: "Washington Wizards"
    }
  ];
  greenPlayers: any[] = [
    {
      playerName: "Hassan Whiteside",
      color: "green",
      fieldGoal: 0.571,
      threePoint: 0.125,
      freeThrow: 0.593,
      number: 21,
      team: "Portland Trailblazers"
    },
    {
      playerName: "Chiney Ogwumike",
      color: "green",
      fieldGoal: 0.494,
      threePoint: 0.25,
      freeThrow: 0.809,
      number: 13,
      team: "Los Angeles Sparks"
    },
    {
      playerName: "Brooke Lopez",
      color: "green",
      fieldGoal: 0.452,
      threePoint: 0.365,
      freeThrow: 0.842,
      number: 11,
      team: "Milwaukee Bucks"
    },
    {
      playerName: "Dwight Howard",
      color: "green",
      fieldGoal: 0.632,
      threePoint: 0.0,
      freeThrow: 0.604,
      number: 12,
      team: "Los Angeles Lakers"
    },
    {
      playerName: "Crystal Langhorne",
      color: "green",
      fieldGoal: 0.409,
      threePoint: 0.316,
      freeThrow: 0.75,
      number: 1,
      team: "Seattle Storm"
    },
    {
      playerName: "Andre Drummond",
      color: "green",
      fieldGoal: 0.533,
      threePoint: 0.132,
      freeThrow: 0.59,
      number: 0,
      team: "Detroit Pistons"
    },
    {
      playerName: "DeAndre Jordan",
      color: "green",
      fieldGoal: 0.634,
      threePoint: 0,
      freeThrow: 0.773,
      number: 6,
      team: "Brooklyn Nets"
    },
    {
      playerName: "Silyva Fowles",
      color: "green",
      fieldGoal: 0.588,
      threePoint: 0,
      freeThrow: 0.707,
      number: 34,
      team: "Minnesota Lynx"
    },
    {
      playerName: "Brittney Griner",
      color: "green",
      fieldGoal: 0.588,
      threePoint: 0.333,
      freeThrow: 0.707,
      number: 42,
      team: "Phoenix Mercury"
    },
    {
      playerName: "DeMarcus Cousins",
      color: "green",
      fieldGoal: 0.48,
      threePoint: 0.274,
      freeThrow: 0.551,
      number: 0,
      team: "Los Angeles Lakers"
    },
    {
      playerName: "Joel Embiid",
      color: "green",
      fieldGoal: 0.484,
      threePoint: 0.3,
      freeThrow: 0.804,
      number: 21,
      team: "Philadelphia 76ers"
    },
    {
      playerName: "Emma Meesseman",
      color: "green",
      fieldGoal: 0.552,
      threePoint: 0.422,
      freeThrow: 0.905,
      number: 33,
      team: "Washington Mystics"
    },
    {
      playerName: "Nikola Vucevic",
      color: "green",
      fieldGoal: 0.518,
      threePoint: 0.364,
      freeThrow: 0.789,
      number: 9,
      team: "Orlando Magic"
    }
  ];
  redPlayers: any[] = [
    {
      playerName: "James Harden",
      color: "red",
      fieldGoal: 0.442,
      threePoint: 0.368,
      freeThrow: 0.879,
      number: 13,
      team: "Houston Rockets"
    },
    {
      playerName: "Chris Paul",
      color: "red",
      fieldGoal: 0.419,
      threePoint: 0.358,
      freeThrow: 0.862,
      number: 3,
      team: "Oklahoma City Thunder"
    },
    {
      playerName: "Josh Richardson",
      color: "red",
      fieldGoal: 0.412,
      threePoint: 0.357,
      freeThrow: 0.861,
      number: 0,
      team: "Philadelphia 76ers"
    },
    {
      playerName: "Kyrie Irving",
      color: "red",
      fieldGoal: 0.487,
      threePoint: 0.401,
      freeThrow: 0.873,
      number: 11,
      team: "Brooklyn Nets"
    },
    {
      playerName: "Damian Lillard",
      color: "red",
      fieldGoal: 0.444,
      threePoint: 0.369,
      freeThrow: 0.912,
      number: 0,
      team: "Portland Trailblazers"
    },
    {
      playerName: "John Wall",
      color: "red",
      fieldGoal: 0.444,
      threePoint: 0.302,
      freeThrow: 0.697,
      number: 2,
      team: "Washington Wizards"
    },
    {
      playerName: "Bradley Beal",
      color: "red",
      fieldGoal: 0.475,
      threePoint: 0.351,
      freeThrow: 0.808,
      number: 3,
      team: "Washington Wizards"
    },
    {
      playerName: "Russell Westbrook",
      color: "red",
      fieldGoal: 0.428,
      threePoint: 0.29,
      freeThrow: 0.656,
      number: 0,
      team: "Houston Rockets"
    },
    {
      playerName: "DeMar DeRozan",
      color: "red",
      fieldGoal: 0.481,
      threePoint: 0.156,
      freeThrow: 0.83,
      number: 10,
      team: "San Antonio Spurs"
    },
    {
      playerName: "Tiana Hawkins",
      color: "red",
      fieldGoal: 0.514,
      threePoint: 0.363,
      freeThrow: 0.925,
      number: 21,
      team: "Washington Mystics"
    },
    {
      playerName: "Skylar Diggins",
      color: "red",
      fieldGoal: 0.403,
      threePoint: 0.297,
      freeThrow: 0.839,
      number: 4,
      team: "Dallas Wings"
    },
    {
      playerName: "Goran Dragic",
      color: "red",
      fieldGoal: 0.413,
      threePoint: 0.348,
      freeThrow: 0.782,
      number: 7,
      team: "Miami Heat"
    },
    {
      playerName: "Natasha Cloud",
      color: "red",
      fieldGoal: 0.394,
      threePoint: 0.326,
      freeThrow: 0.683,
      number: 9,
      team: "Washington Mystics"
    }
  ];
  purplePlayers: any[] = [
    {
      playerName: "Leilani Mitchell",
      color: "purple",
      fieldGoal: 0.441,
      threePoint: 0.43,
      freeThrow: 0.82,
      number: 5,
      team: "Phoenix Mercury"
    },
    {
      playerName: "Blake Griffin",
      color: "purple",
      fieldGoal: 0.462,
      threePoint: 0.362,
      freeThrow: 0.753,
      number: 23,
      team: "Detroit Pistons"
    },
    {
      playerName: "Chandler Parsons",
      color: "purple",
      fieldGoal: 0.374,
      threePoint: 0.309,
      freeThrow: 0.88,
      number: 25,
      team: "Atlanta Hawks"
    },
    {
      playerName: "Candance Parker",
      color: "purple",
      fieldGoal: 0.422,
      threePoint: 0.267,
      freeThrow: 0.791,
      number: 3,
      team: "Los Angeles Sparks"
    },
    {
      playerName: "Giannis Antetokounmpo",
      color: "purple",
      fieldGoal: 0.578,
      threePoint: 0.256,
      freeThrow: 0.742,
      number: 34,
      team: "Milkwaukee Bucks"
    },
    {
      playerName: "Gordon Hayward",
      color: "purple",
      fieldGoal: 0.466,
      threePoint: 0.333,
      freeThrow: 0.834,
      number: 20,
      team: "Boston Celtics"
    },
    {
      playerName: "Rudy Gay",
      color: "purple",
      fieldGoal: 0.504,
      threePoint: 0.402,
      freeThrow: 0.816,
      number: 22,
      team: "San Antonio Spurs"
    },
    {
      playerName: "Anthony Davis",
      color: "purple",
      fieldGoal: 0.517,
      threePoint: 0.331,
      freeThrow: 0.795,
      number: 23,
      team: "Los Angeles Lakers"
    },
    {
      playerName: "Kawhi Leonard",
      color: "purple",
      fieldGoal: 0.493,
      threePoint: 0.376,
      freeThrow: 0.773,
      number: 2,
      team: "Los Angeles Clippers"
    },
    {
      playerName: "Nneka Ogwumike",
      color: "purple",
      fieldGoal: 0.535,
      threePoint: 0.143,
      freeThrow: 0.734,
      number: 30,
      team: "Los Angeles Sparks"
    },
    {
      playerName: "Liz Cabbage",
      color: "purple",
      fieldGoal: 0.504,
      threePoint: 0.167,
      freeThrow: 0.748,
      number: 8,
      team: "Las Vegas Aces"
    },
    {
      playerName: "Jimmy Butler",
      color: "purple",
      fieldGoal: 0.461,
      threePoint: 0.338,
      freeThrow: 0.868,
      number: 23,
      team: "Miami Heat"
    },
    {
      playerName: "Al Horford",
      color: "purple",
      fieldGoal: 0.535,
      threePoint: 0.36,
      freeThrow: 0.821,
      number: 42,
      team: "Philadelphia 76ers"
    }
  ];

  constructor(private http: HttpClient) {}
  //return all the players with a param of the different colors;
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
}
