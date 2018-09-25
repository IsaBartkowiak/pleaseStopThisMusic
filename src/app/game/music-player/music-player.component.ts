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
        const distanceEvent = this.clickContainer.subscribe(distance => {
            if (this.audio) {
                this.audio.volume = this.getRelativeVolumetoDistance(distance);
            }
        });
        this.subscription.add(distanceEvent);
        const findedEvent = this.win.subscribe(status => {
            if (status) {
                this.audio.volume = 0;
            }
        });
        this.subscription.add(findedEvent);

        const musicEvent = this.musicService.getCurrentMusic().subscribe(music => {
            if (music) {
                if (this.audio) {
                    this.audio.pause();
                }
                this.music = music;
                this.infinitePlay(music.file);
            }
        });
        this.subscription.add(musicEvent);
    }

    infinitePlay(file) {
        this.audio = new Audio('assets/audio/' + file);
        this.playAudio();
        this.audio.addEventListener('ended', () => {
            this.playAudio();
        }, false);
    }

    playAudio() {
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
