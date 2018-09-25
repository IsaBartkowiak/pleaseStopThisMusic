import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IndicationPipe } from './indication.pipe';
import { GameIndicationComponent } from './game-indication.component';
import { Subject, Subscription} from 'rxjs';
import { MUSICS } from '../shared/mock-musics';
import { MusicService } from '../shared/music.service';

describe('GameIndicationComponent', () => {
    let component: GameIndicationComponent;
    let fixture: ComponentFixture<GameIndicationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ GameIndicationComponent, IndicationPipe ],
            providers: [MusicService]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GameIndicationComponent);
        component = fixture.componentInstance;
        component.clickContainer = new Subject();
        component.clickContainer.next(160);
        component.win = new Subject();
        const musicService = TestBed.get(MusicService);
        musicService.setMusics();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have all properties', () => {
        expect(component.win instanceof Subject).toBeTruthy('win is set');
        expect(component.clickContainer instanceof Subject).toBeTruthy('try is set');
        expect(component.distance).toBeFalsy('distance is set');
        expect(component.score).toEqual(0, 'Score is set');
    });

    it('should have totalMusics works', () => {
        component.ngOnInit();
        expect(component.totalMusic).toBe(MUSICS.length);
    });

    it('should have music set', () => {
        component.ngOnInit();
        const musicService = TestBed.get(MusicService);
        musicService.setMusics();
        fixture.detectChanges();
        expect(component.music.name).toEqual(MUSICS[0].name);
    });

    it('should show and hide indications messages', () => {
        component.ngOnInit();
        expect(fixture.debugElement.query(By.css('.game-indication-message'))).toBeTruthy();
    });

});
