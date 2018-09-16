import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MUSICS } from './mock-musics';

@Injectable({
	providedIn: 'root'
})
export class MusicService {

	constructor() { }
	
	getMusics(): Observable<any[]> {
		return of(MUSICS);
	}
}
