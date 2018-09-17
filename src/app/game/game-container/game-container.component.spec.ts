import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, Subject} from 'rxjs';
import { GameContainerComponent } from './game-container.component';
import { MusicPlayerComponent } from '../music-player/music-player.component';

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
    expect(typeof component.randomPosition == "object").toBeTruthy("randomPosition is set");
    expect(component.music).toBeTruthy("musics is set");
    expect(component.music.name).toBe("Khaled - Aïcha", "Music name is set");
    expect(component.win instanceof Subject).toBeTruthy("win is set");
    expect(component.try instanceof Subject).toBeTruthy("try is set");
  });
  
  it('should random position answer', () => {
    component.ngOnInit();
    let top1 = parseInt(component.randomPosition.top.slice(0, -1));
    component.ngOnInit();
    let top2 = parseInt(component.randomPosition.top.slice(0, -1));
    console.log(top2);
    expect(top1 >= 0 && top1 <= 85).toBeTruthy('Position between 0 to 85%');
    expect(top1 != top2).toBeTruthy('Position is random');
  });
  
  it('calculateDistance() should return the right distance', () => {
    component.ngOnInit();
    component.randomPosition = {
      'top': "100px", 
      'left' : "100px"
    }
    fixture.detectChanges();
    let distance = component.calculateDistance(0,0);
    expect(distance).toBe(199, 'Calculate right distance click');
  });
  it('calculateDistance() should return 0 if answer is clicked', () => {
    component.ngOnInit();
    component.randomPosition = {
      'top': "0%", 
      'left' : "0%"
    }
    fixture.detectChanges();
    let distance = component.calculateDistance(1,1);
    expect(distance).toBe(0, 'Return 0 if answer is clicked');
  });
});
