import { TestBed , tick, fakeAsync} from '@angular/core/testing';
import { TimerService } from './timer.service';
import { Observable} from 'rxjs';

describe('TimerService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [ TimerService ]
    }));

    it('should be created', () => {
        const service: TimerService = TestBed.get(TimerService);
        expect(service).toBeTruthy();
    });

    it('getTimer() should return an observable', () => {
        const service: TimerService = TestBed.get(TimerService);
        expect(service.getTimer() instanceof Observable).toBeTruthy();
    });

    it('should return good number of minutes/seconds', fakeAsync(() => {
        const service: TimerService = TestBed.get(TimerService);
        let currentTime = undefined;
        const sub = service.getTimer().subscribe(x => {
            currentTime = x;
        });
        tick(2001);
        expect(currentTime).toEqual('00:01');
        tick(60000);
        expect(currentTime).toEqual('01:01');
        sub.unsubscribe();
    }));

});
