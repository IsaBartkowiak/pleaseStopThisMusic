import { Injectable, Inject, Optional } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { MUSICS } from './mock-musics';

@Injectable({
    providedIn: 'root'
})
export class MusicService {
    private currentMusic: Subject<any>;
    private currentIndex = 0;
    private musics: any[];

    constructor(@Inject('testdata') @Optional() private testdata?: any[]) {
        this.musics = testdata || MUSICS;
        this.currentMusic = new Subject();
    }

    getMusics(): Observable<any[]> {
        return of(this.musics);
    }

    getCurrentMusic(): Subject<any> {
        return this.currentMusic;
    }

    nextMusic() {
        if (this.currentIndex === (this.musics.length - 1)) {
            return false;
        }
        this.currentIndex++;
        this.currentMusic.next(this.musics[this.currentIndex]);
    }

    getTotalCount(): number {
        return this.musics.length;
    }

    setMusics(): void {
        this.currentIndex = 0;
        this.currentMusic.next(this.musics[this.currentIndex]);
    }

}
