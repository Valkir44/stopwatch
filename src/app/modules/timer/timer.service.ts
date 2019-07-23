import {Injectable} from '@angular/core';
import {BehaviorSubject, interval, Subject} from "rxjs";
import * as moment from 'moment';
import {map, takeUntil} from "rxjs/operators";
import {stopWatchModel} from "./models/stop-watch.model";

@Injectable({
    providedIn: 'root'
})
export class TimerService {
    _timerToShow = new BehaviorSubject<stopWatchModel>({minutes: 0, seconds: 0, milliseconds: 0});
    getTimer$ = this._timerToShow.asObservable();
    stop$ = new Subject();
    diffTime$ = new Subject();
    start: number;

    constructor() {
    }

    showClock(startTimestamp) {
        console.warn(startTimestamp);
        interval(10)
            .pipe(
                map(() => {
                    this.start = moment().diff(startTimestamp);
                }),
                takeUntil(this.stop$))
            .subscribe(() => {
                this.diffTime$.next(this.start);
                this.upDateTimer(moment(this.start).minutes(), moment(this.start).seconds(), moment(this.start).milliseconds())
            });
    }

    upDateTimer(minutes, seconds, milliseconds) {
        this._timerToShow.next({minutes: minutes, seconds: seconds, milliseconds: milliseconds});
    }

    stopTimer() {
        this.stop$.next();
    }
}
