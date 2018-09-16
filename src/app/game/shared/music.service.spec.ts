import { TestBed } from '@angular/core/testing';
import { MusicService } from './music.service';

describe('MusicService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: MusicService = TestBed.get(MusicService);
		expect(service).toBeTruthy();
	});
	it('should have a get music function', () => {
		const service: MusicService = TestBed.get(MusicService);
		service.getMusics().subscribe((music) => {
			expect(music.length).toBe(2);
			expect(music[0].name).toEqual('Khaled - Aïcha');
			expect(music[0].file).toEqual('khaled-aicha.mp3');
		});
	});
});
