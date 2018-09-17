import { Component, OnInit, Input } from '@angular/core';
import { Subject} from 'rxjs';
import { MusicService } from './../shared/music.service';

@Component({
	selector: 'pstm-music-player',
	templateUrl: './music-player.component.html',
	styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit {
	@Input() try : Subject<any>;
	@Input() win : Subject<any>;
	music: any;
	audio: any;
	musicSubscription;
	trySubscription;
	winSubscription;
	
	constructor(private MusicService: MusicService) { }

	ngOnInit() {
		this.trySubscription = this.try.subscribe(distance => {
			if(this.audio){
				this.audio.volume = this.getRelativeVolumetoDistance(distance);
			}
		});
		this.winSubscription = this.win.subscribe(status => {
			if(status){
				this.audio.pause();
			}
		});
		this.musicSubscription = this.MusicService.getCurrentMusic().subscribe(music => {
			if(this.audio){
				this.audio.pause();
				this.audio.load();
				let that = this;
				setTimeout(function() {that.audio.play()}, 0);
			}
			this.music = music;
		});
	}
	
	ngAfterViewInit() {
		this.audio = document.getElementById('music-player');
		this.audio.play();
		this.audio.volume = 0.4;
	}
	
	getRelativeVolumetoDistance(distance){
		if((1 - (distance / 1000)) > 1){
			console.log(1);
			return 1;
		}
		if((1 - (distance / 1000) < 0)){
			console.log(0.1);
			return 0.1;
		}
		console.log(Math.round( (1 - (distance / 1000)) * 10) / 10);
		return Math.round( (1 - (distance / 1000)) * 10) / 10;
	}
	
	ngOnDestroy() {
		// this.winSubscription.unsubscribe();
		// this.trySubscription.unsubscribe();
		// this.musicSubscription.unsubscribe();
	}


}
