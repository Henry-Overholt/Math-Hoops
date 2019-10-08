import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { RouterModule, Routes } from "@angular/router";
import { GameBoardComponent } from "./game-board/game-board.component";
import { CountdownModule } from "ngx-countdown";
import { HomeComponent } from "./home/home.component";
import { DraftComponent } from "./draft/draft.component";
import { HttpClientModule } from "@angular/common/http";

const appRoutes: Routes = [
  { path: "game", component: GameBoardComponent },
  { path: "draft", component: DraftComponent },
  { path: "home", component: HomeComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: HomeComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    HomeComponent,
    DraftComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CountdownModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
