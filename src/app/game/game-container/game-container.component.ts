import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subject, Subscription} from 'rxjs';
import { MusicService } from './../shared/music.service';
import { TimerService } from './../shared/timer.service';
import { GameIndicationComponent } from '../game-indication/game-indication.component';

@Component({
    selector: 'pstm-game-container',
    templateUrl: './game-container.component.html',
    styleUrls: ['./game-container.component.scss']
})
export class GameContainerComponent implements OnInit, OnDestroy {

    @ViewChild(GameIndicationComponent) indication: GameIndicationComponent;
    private _timerSubscription: Subscription;
    clickContainer: Subject<any> = new Subject();
    win: Subject<any> = new Subject();
    circlePosition: any;
    randomPosition: any;
    time: string;
    finded;
    endOfGame;
    showCircle;


    constructor (private musicService: MusicService, private timerService: TimerService) {}

    ngOnInit() {
        this.setRandomPosition();
        this.listenTimer();
    }

    setRandomPosition() {
        const ansDiv = <HTMLElement> document.getElementById('answer');
        this.randomPosition = {
            'top': Math.floor(Math.random() * (window.innerHeight - ansDiv.clientHeight - 50)) + 'px',
            'left' : Math.floor(Math.random() * (window.innerWidth - ansDiv.clientWidth - 50)) + 'px'
        };
    }

    listenTimer(){
        this._timerSubscription = this.timerService.getTimer().subscribe(
            time => {
                this.time = time;
            });
    }

    restartTimer(){
        this._timerSubscription.unsubscribe();
        this.listenTimer();
    }

    nextMusic(event) {
        event.stopPropagation();
        this.finded = false;
        this.setRandomPosition();
        this.musicService.nextMusic();
    }

    updateCircle(event){
        this.circlePosition = {
            'left': event.clientX - 5+'px',
            'top': event.clientY - 5+'px',
        }
        this.showCircle = true;
        const that = this;
        setTimeout(function() {
            that.showCircle = false;
        }, 500);
    }

    checkResult(event) {
        const distance = this.calculateDistance(event.clientX, event.clientY);
        this.notifyTry(distance);
        if (distance === 0) {
            this.finded = true;
            this.notifyWin(true);
        }
        if(this.indication.score === this.indication.totalMusic){
            this.endOfGame = true;
            this._timerSubscription.unsubscribe();
        }
    }

    restartGame(){
        event.stopPropagation();
        this.indication.score = 0;
        this.finded = false;
        this.endOfGame = false;
        this.setRandomPosition();
        this.musicService.resetMusics();
        this.restartTimer();
    }

    calculateDistance(clickX, clickY) {
        const answer = document.getElementById('answer');
        if (
            clickX >= answer.offsetLeft &&
            clickX <= (answer.offsetLeft + answer.offsetWidth - 30) &&
            clickY >= answer.offsetTop &&
            clickY <= (answer.offsetTop + answer.offsetHeight - 30)) {
            return 0;
    }
    return Math.floor(Math.sqrt(Math.pow(
        clickX - (answer.offsetLeft + (answer.offsetWidth / 2)), 2) +
    Math.pow(clickY - (answer.offsetTop + (answer.offsetHeight / 2)), 2
        )));
}

notifyTry(distance) {
    this.clickContainer.next(distance);
}

notifyWin(status) {
    this.win.next(status);
}

ngOnDestroy() {
    this.musicService.getCurrentMusic().unsubscribe();
    this._timerSubscription.unsubscribe();
}

}
