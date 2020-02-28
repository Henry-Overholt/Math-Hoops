import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { RouterModule, Routes } from "@angular/router";
import { GameBoardComponent } from "./game-board/game-board.component";
import {
  CountdownModule,
  CountdownGlobalConfig,
  CountdownConfig
} from "ngx-countdown";
import { HomeComponent } from "./home/home.component";
import { DraftComponent } from "./draft/draft.component";
import { HttpClientModule } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";

const appRoutes: Routes = [
  { path: "game", component: GameBoardComponent },
  { path: "draft", component: DraftComponent },
  { path: "**", component: HomeComponent }
];
export function countdownConfigFactory(): CountdownConfig {
  return {};
}
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
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
