import { Injectable } from "@angular/core";
import { Observable, interval } from "rxjs";
import { map } from 'rxjs/operators'

@Injectable()
export class TimerService {

    getTimer(){
        return interval(1000).pipe(
            map((x) => {
                return this.getMinutes(x)+':'+this.getSeconds(x);
            }));
    }

    private getSeconds(ticks: number) {
        return this.pad(ticks % 60);
    }

    private getMinutes(ticks: number) {
        return this.pad((Math.floor(ticks / 60)) % 60);
    }

    private getHours(ticks: number) {
        return this.pad(Math.floor((ticks / 60) / 60));
    }

    private pad(digit: any) {
        return digit <= 9 ? '0' + digit : digit;
    }

}
