import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject, Subscription} from 'rxjs';
import { MusicService } from './../shared/music.service';

@Component({
    selector: 'pstm-game-indication',
    templateUrl: './game-indication.component.html',
    styleUrls: ['./game-indication.component.scss']
})
export class GameIndicationComponent implements OnInit, OnDestroy {
    @Input() clickContainer: Subject<any>;
    @Input() win: Subject<any>;
    subscription: Subscription = new Subscription();
    distance;
    showIndicator;
    showMessage;
    score : number = 0;
    totalMusic: number;
    music: any;

    constructor(private musicService: MusicService) { }

    ngOnInit() {
        const sub1 = this.clickContainer.subscribe(distance => {
            this.distance = distance;
        });
        this.subscription.add(sub1);
        const sub2 =  this.win.subscribe(status => {
            if (status) {
                this.showIndicator = false;
                this.score++;
            }
        });
        this.subscription.add(sub2);
        const sub3 =  this.musicService.getCurrentMusic().subscribe(music => {
            this.showIndicator = true;
            this.distance = null;
            this.music = music;
        });
        this.subscription.add(sub3);
        this.totalMusic = this.musicService.getTotalCount();
        this.showMessage = true;
        setTimeout(()=>{
            this.showMessage = false;
        }, 4000);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
