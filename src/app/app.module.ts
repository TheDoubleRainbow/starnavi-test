import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GameSettingsComponent } from './game-settings/game-settings.component';
import { InfoMessageComponent } from './info-message/info-message.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { GameFieldComponent } from './game-field/game-field.component';
import { GameBoxComponent } from './game-box/game-box.component';

@NgModule({
  declarations: [
    AppComponent,
    GameSettingsComponent,
    InfoMessageComponent,
    LeaderboardComponent,
    GameFieldComponent,
    GameBoxComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
