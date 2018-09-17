import { Injectable, Inject, Optional } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { MUSICS } from './mock-musics';

@Injectable({
	providedIn: 'root'
})
export class MusicService {
	private currentMusic: BehaviorSubject<any>;
	private currentIndex: number = 0;
	private musics: any[];
	
	constructor(@Inject('testdata') @Optional() private testdata?: any[]) {
		this.musics = testdata || MUSICS;
		this.currentMusic = new BehaviorSubject(this.musics[0]);
	}
	
	getMusics(): Observable<any[]> {
		return of(this.musics);
	}
	
	getCurrentMusic(): BehaviorSubject<any> {
		return this.currentMusic;
	}
	
	nextMusic() {
		if(this.currentIndex == this.musics.length) return false;
		this.currentIndex++;
		this.currentMusic.next(this.musics[this.currentIndex]);
	}
	
	getTotalCount(): number {
		return this.musics.length;
	}

}
