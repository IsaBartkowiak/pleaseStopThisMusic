import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { Subject, Subscription} from 'rxjs';
import { MusicService } from './../shared/music.service';

@Component({
    selector: 'pstm-music-player',
    templateUrl: './music-player.component.html',
})
export class MusicPlayerComponent implements OnInit, OnDestroy {
    @Input() clickContainer: Subject<any>;
    @Input() win: Subject<any>;
    music: any;
    audio: any;
    subscription: Subscription = new Subscription();

    constructor(private musicService: MusicService) { }

    ngOnInit() {
        const sub1 = this.clickContainer.subscribe(distance => {
            if (this.audio) {
                this.audio.volume = this.getRelativeVolumetoDistance(distance);
            }
        });
        this.subscription.add(sub1);
        const sub2 = this.win.subscribe(status => {
            if (status) {
                this.audio.volume = 0.1;
            }
        });
        this.subscription.add(sub2);

        const sub3 = this.musicService.getCurrentMusic().subscribe(music => {
            if (this.audio) {
                this.audio.pause();
            }
            this.music = music;
            this.infinitePlay(music.file);
        });
        this.subscription.add(sub3);
    }

    infinitePlay(file){
        this.audio = new Audio('assets/audio/'+file);
        this.playAudio();
        var that = this;
        this.audio.addEventListener('ended', function() {
            this.currentTime = 0;
            that.playAudio();
        }, false);
    }

    playAudio(){
        this.audio.load();
        this.audio.play();
        this.audio.volume = 0.4;
    }

    getRelativeVolumetoDistance(distance) {
        if (( 1 - (distance / 1000 )) > 1) {
            return 1;
        }
        if ((1 - (distance / 1000) < 0)) {
            return 0.1;
        }
        return Math.round( (1 - (distance / 1000)) * 10) / 10;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }


}
