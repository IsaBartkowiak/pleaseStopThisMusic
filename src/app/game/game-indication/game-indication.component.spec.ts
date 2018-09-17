import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameIndicationComponent } from './game-indication.component';

describe('GameIndicationComponent', () => {
  let component: GameIndicationComponent;
  let fixture: ComponentFixture<GameIndicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameIndicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameIndicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
