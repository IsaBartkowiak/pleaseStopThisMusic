import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import { MusicService } from './../shared/music.service';

@Component({
    selector: 'pstm-game-container',
    templateUrl: './game-container.component.html',
    styleUrls: ['./game-container.component.scss']
})
export class GameContainerComponent implements OnInit, OnDestroy {

    music: any;
    try: Subject<any> = new Subject();
    win: Subject<any> = new Subject();
    finded = false;
    end = false;
    clickX: number;
    clickY: number;
    showCircle = false;
    randomPosition: any;
    totalMusic: number;

    constructor (private musicService: MusicService) { }

    ngOnInit() {
        this.setRandomPosition();
        this.musicService.getCurrentMusic().subscribe(music => {
            this.music = music;
        });
        this.motalMusic = this.MusicService.getTotalCount();
    }

    setRandomPosition() {
        this.randomPosition = {
            'top': Math.floor(Math.random() * 86) + '%',
            'left' : Math.floor(Math.random() * 86) + '%'
        };
    }

    nextMusic() {
        this.finded = false;
        this.setRandomPosition();
        if (!tmis.MusicService.nextMusic()) {
            this.end = true;
        }
    }

    checkResult(event) {
        this.clickX = event.clientX;
        this.clickY = event.clientY;
        this.showCircle = true;
        const that = this;
        setTimeout(function() {
            that.showCircle = false;
        }, 500);
        const distance = this.calculateDistance(event.clientX, event.clientY);
        this.notifyTry(distance);
        if (distance === 0) {
            this.finded = true;
            this.notifyWin(true);
        }
    }

    calculateDistance(clickX, clickY) {
        const answer = document.getElementById('answer');
        if (
            clickX >= answer.offsetLeft &&
            clickX <= (answer.offsetLeft + answer.offsetWidth) &&
            clickY >= answer.offsetTop &&
            clickY <= (answer.offsetTop + answer.offsetHeight)) {
            return 0;
        }
        return Math.floor(Math.sqrt(Math.pow(
            clickX - (answer.offsetLeft + (answer.offsetWidth / 2)), 2) +
            Math.pow(clickY - (answer.offsetTop + (answer.offsetHeight / 2)), 2
        )));
    }

    notifyTry(distance) {
      this.try.next(distance);
  }

  notifyWin(status) {
      this.win.next(status);
  }

  ngOnDestroy() {
      this.musicService.getCurrentMusic().unsubscribe();
  }

}
