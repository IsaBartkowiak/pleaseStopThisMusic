import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, Subject} from 'rxjs';
import { MusicPlayerComponent } from './music-player.component';

describe('MusicPlayerComponent', () => {
    let component: MusicPlayerComponent;
    let fixture: ComponentFixture<MusicPlayerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ MusicPlayerComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MusicPlayerComponent);
        component = fixture.componentInstance;
        const win : Subject<any> = new Subject();
        const essay : Subject<any> = new Subject();
        component.clickContainer = essay;
        component.win = win;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have an audio file setted', () => {
        component.ngOnInit();
        fixture.detectChanges();
        expect(component.music.file).toBeTruthy();
    });

    it('should return good relative volume to distance', () => {
        component.ngOnInit();
        fixture.detectChanges();
        let volume = component.getRelativeVolumetoDistance(300);
        expect(volume >= 0 && volume <= 1).toBeTruthy();
        volume = component.getRelativeVolumetoDistance(10000);
        expect(volume).toBe(0.1);
        volume = component.getRelativeVolumetoDistance(2);
        expect(volume).toBe(1);
    });

});
