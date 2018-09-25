import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject, Observable, Subscription} from 'rxjs';
import { MusicService } from './../shared/music.service';

@Component({
    selector: 'pstm-game-indication',
    templateUrl: './game-indication.component.html',
    styleUrls: ['./game-indication.component.scss']
})
export class GameIndicationComponent implements OnInit, OnDestroy {
    @Input() clickContainer: Subject<any>;
    @Input() win: Subject<any>;
    private _subscription: Subscription = new Subscription();
    distance;
    showIndicator;
    showMessage;
    score = 0;
    totalMusic: number;
    music: any;
    counter;

    constructor(private musicService: MusicService) { }

    ngOnInit() {
        const sub1 = this.clickContainer.subscribe(distance => {
            this.distance = distance;
        });
        this._subscription.add(sub1);
        const sub2 =  this.win.subscribe(status => {
            if (status) {
                this.showIndicator = false;
                this.score++;
            }
        });
        this._subscription.add(sub2);
        const sub3 =  this.musicService.getCurrentMusic().subscribe(music => {
            this.showIndicator = true;
            this.distance = null;
            this.music = music;
        });
        this._subscription.add(sub3);
        this.totalMusic = this.musicService.getTotalCount();
        this.showMessage = true;
    }

    startGame() {
        this.musicService.setMusics();
        this.showMessage = false;
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

}
