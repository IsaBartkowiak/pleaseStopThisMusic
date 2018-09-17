import { TestBed } from '@angular/core/testing';
import { MusicService } from './music.service';
import { Observable, of, BehaviorSubject } from 'rxjs';

export const MUSICS: any[] = [
  { 
    id: 1, 
    name: 'test1',
    file: 'test',
    image: 'test'
  },
  { 
    id: 2, 
    name: 'test2',
    file: 'test',
    image: 'test'
  }
];

describe('MusicService', () => {
	beforeEach(() => 
		TestBed.configureTestingModule({})
		);

	it('should be created', () => {
		let service: MusicService = TestBed.get(MusicService);
		expect(service).toBeTruthy();
	});
	
	it('should have musics setted', () => {
		const service: MusicService = TestBed.get(MusicService);
		expect(service.MUSICS).toBeTruthy();
	});
	
	it('should have getMusics() function', () => {
		const service: MusicService = TestBed.get(MusicService);
		service.MUSICS = MUSICS;
		service.getMusics().subscribe((music) => {
			expect(music.length).toBe(2);
			expect(music[0].name).toEqual('test1');
			expect(music[0].file).toEqual('test');
		});
	});
	it('should have getCurrentMusic() function', () => {
		const service: MusicService = TestBed.get(MusicService);
		expect(service.getCurrentMusic() instanceof BehaviorSubject).toBeTruthy();
		service.getCurrentMusic().subscribe((music) => {
			expect(music.name).toEqual('test1');
			expect(music.file).toEqual('test');
			expect(music.image).toEqual('test');
		});
	});
	it('should have getTotalCount function', () => {
		const service: MusicService = TestBed.get(MusicService);
		service.MUSICS = MUSICS;
		expect(service.getTotalCount()).toEqual(2);
	});
});
