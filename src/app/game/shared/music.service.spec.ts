import { TestBed } from '@angular/core/testing';
import { MusicService } from './music.service';
import { Observable, of, Subject } from 'rxjs';

export const TESTMUSICS: any[] = [
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

    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [MusicService, {provide: 'testdata', useValue: TESTMUSICS}] });
    });

    it('should be created', () => {
        const service = TestBed.get(MusicService);
        expect(service).toBeTruthy();
    });

    it('should have getMusics() working function', () => {
        const service = TestBed.get(MusicService);
        service.setMusics();
        service.getMusics().subscribe((music) => {
            expect(music.length).toBe(2);
            expect(music[0].name).toEqual('test1');
            expect(music[0].file).toEqual('test');
        });
    });
    it('should have getCurrentMusic() working function', () => {
        const service = TestBed.get(MusicService);
        service.setMusics();
        expect(service.getCurrentMusic() instanceof Subject).toBeTruthy();
        service.getCurrentMusic().subscribe((music) => {
            expect(music.name).toEqual('test1');
            expect(music.file).toEqual('test');
            expect(music.image).toEqual('test');
        });
    });

    it('should have getTotalCount working function', () => {
        const service = TestBed.get(MusicService);
        expect(service.getTotalCount()).toEqual(2);
    });
});
