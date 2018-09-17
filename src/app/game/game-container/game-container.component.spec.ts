import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, Subject} from 'rxjs';
import { GameContainerComponent } from './game-container.component';
import { MusicPlayerComponent } from '../music-player/music-player.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('GameContainerComponent', () => {
  let component: GameContainerComponent;
  let fixture: ComponentFixture<GameContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameContainerComponent, MusicPlayerComponent ]
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
    expect(component.music).toBeTruthy('musics is set');
    expect(component.music.name).toBe('Khaled - Aïcha', 'Music name is set');
    expect(component.win instanceof Subject).toBeTruthy('win is set');
    expect(component.try instanceof Subject).toBeTruthy('try is set');
    expect(component.totalMusic).toBeTruthy();
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

  it('should show answer div when clicked on the right place', () => {
    component.ngOnInit();
    component.randomPosition = {
      'top': '0px',
      'left' : '0px'
  };
  fixture.detectChanges();
  const container = <HTMLElement> document.querySelector('.game-container');
  container.click();
  const distance = component.calculateDistance(1, 1);
  expect(distance).toBe(0, 'Return 0 if answer is clicked');
  expect(component.finded).toBe(true);
});

  it('should can pass to the next music', () => {
    const tmpMusicName = component.music.name;
    const tmpTopPosition = component.randomPosition.top;
    component.nextMusic();
    fixture.detectChanges();
    expect(component.music).toBeTruthy();
    expect(tmpMusicName !== component.music.name).toBeTruthy();
    expect(tmpTopPosition !== component.randomPosition.top).toBeTruthy();
});

});
