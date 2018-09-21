import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicService } from './shared/music.service';
import { TimerService } from './shared/timer.service';
import { GameContainerComponent } from './game-container/game-container.component';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { GameIndicationComponent } from './game-indication/game-indication.component';
import { IndicationPipe } from './game-indication/indication.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
  	GameContainerComponent,
  	MusicPlayerComponent,
  	GameIndicationComponent,
  	IndicationPipe
  ],
  providers: [MusicService, TimerService],
  exports: [GameContainerComponent]
})

export class GameModule { }
