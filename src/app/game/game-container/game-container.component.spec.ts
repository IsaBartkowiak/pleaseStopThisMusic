import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, Subject} from 'rxjs';
import { GameContainerComponent } from './game-container.component';
import { MusicPlayerComponent } from '../music-player/music-player.component';
import { TimerService } from '../shared/timer.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { GameIndicationComponent } from '../game-indication/game-indication.component';
import { IndicationPipe } from '../game-indication/indication.pipe';

describe('GameContainerComponent', () => {
    let component: GameContainerComponent;
    let fixture: ComponentFixture<GameContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ GameContainerComponent, MusicPlayerComponent, GameIndicationComponent, IndicationPipe],
            providers: [ TimerService ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GameContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have all properties', () => {
        expect(typeof component.randomPosition === 'object').toBeTruthy('randomPosition is set');
        expect(component.win instanceof Subject).toBeTruthy('win is set');
        expect(component.clickContainer instanceof Subject).toBeTruthy('try is set');
        expect(component.circlePosition).toBeFalsy('circlePosition is set');
        expect(component.showCircle).toBeFalsy('showCircle is set');
    });

    it('should have answer div on page', () => {
        const ansDiv = fixture.debugElement.query(By.css('#answer'));
        expect(ansDiv).toBeTruthy();
    });

    it('should random position answer between right values', () => {
        const top = parseInt(component.randomPosition.top.slice(0, -1), 10);
        const left = parseInt(component.randomPosition.left.slice(0, -1), 10);
        const ansDiv = <HTMLElement> document.getElementById('answer');
        expect(top >= 0 && top <= (window.innerHeight - ansDiv.clientHeight)).toBeTruthy();
        expect(left >= 0 && left <= (window.innerWidth - ansDiv.clientWidth)).toBeTruthy();
    });

    it('calculateDistance() should return the right distance', () => {
        component.randomPosition = {
            'top': '100px',
            'left' : '100px'
        };
        const ansDiv = <HTMLElement> document.getElementById('answer');
        ansDiv.style.width = '0px';
        ansDiv.style.height = '0px';
        ansDiv.style.lineHeight = '0px';
        fixture.detectChanges();

        const distance = component.calculateDistance(0, 0);
        expect(distance).toBe(141, 'Calculate right distance click'); // diagonale
    });

    it('should show answer div when answer is finded', () => {
        simulateWin(component);
        const distance = component.calculateDistance(1, 1);
        fixture.detectChanges();
        expect(distance).toBe(0);
        expect(component.finded).toBe(true);
    });

    it('should increment score when answer is finded', () => {
        const tmpScore = component.indication.score;
        const distance = simulateWin(component);
        expect(component.indication.score).toBe(1);
    });

    it('should can pass to the next music', () => {
        const tmpPosition = component.randomPosition;
        component.finded = true;
        fixture.detectChanges();
        const nextBtn = <HTMLElement> document.querySelector('.game-next');
        expect(nextBtn).toBeTruthy();
        nextBtn.click();
        fixture.detectChanges();
        expect(tmpPosition.top !== component.randomPosition.top).toBeTruthy();
        expect(tmpPosition.left !== component.randomPosition.left).toBeTruthy();
    });

    function simulateWin(component){
        component.ngOnInit();
        component.randomPosition = {
            'top': '0px',
            'left' : '0px'
        };
        fixture.detectChanges();
        const container = <HTMLElement> document.querySelector('.game-container');
        var ev = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true,
            'screenX': 1,
            'screenY': 1
        });
        container.dispatchEvent(ev);
        fixture.detectChanges();
    }

});
