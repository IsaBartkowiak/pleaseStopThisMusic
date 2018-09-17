import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicService } from './shared/music.service';
import { GameContainerComponent } from './game-container/game-container.component';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { GameIndicationComponent } from './game-indication/game-indication.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
  	GameContainerComponent,
  	MusicPlayerComponent,
  	GameIndicationComponent
  ],
  providers: [MusicService],
  exports: [GameContainerComponent]
})

export class GameModule { }
