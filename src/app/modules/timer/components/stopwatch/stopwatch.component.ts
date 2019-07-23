import {Component, OnInit} from '@angular/core';
import {fromEvent, Observable} from "rxjs";
import {TimerService} from "../../timer.service";
import {lap, stopWatchModel, stopWatchToShowModel, toLocalStore} from "../../models/stop-watch.model";
import * as moment from 'moment';

@Component({
    selector: 'app-stopwatch',
    templateUrl: './stopwatch.component.html',
    styleUrls: ['./stopwatch.component.scss']
})
export class StopwatchComponent implements OnInit {
    stopWatchToShow: stopWatchToShowModel;
    stopWatch: stopWatchModel;
    source$: Observable<Event>;
    diffTime: number;
    status: string;
    btnStatus = 'START';
    lap: lap;
    lapArr: lap[] = [];

    constructor(private timerService: TimerService) {
        this.subscriberFunc();
    }

    ngOnInit() {
        this.initDuplicate();
        this.initSubscribeEvent();
    }

    subscriberFunc() {
        this.timerService.getTimer$.subscribe(data => {
            this.stopWatch = data;
            this.formatTime(this.stopWatch);
        });
        this.timerService.diffTime$.subscribe(data => {
            this.diffTime = data as number;
        })
    }

    getLap() {
        if (this.diffTime && this.status === 'START') {
            this.lap = this.stopWatchToShow;
            this.lap.id = (+new Date);
            this.lapArr.push(this.lap);
            localStorage.setItem('lapState', JSON.stringify(this.lapArr));
        }
    }

    removeLap(lapId) {
        this.lapArr = this.lapArr.filter(lap => lap.id !== lapId);
        localStorage.setItem('lapState', JSON.stringify(this.lapArr));
    }

    start() {
        this.status = 'START';
        this.btnStatus = 'PAUSE';
        if (!this.diffTime) {
            const putTime = moment().valueOf();
            this.timerService.showClock(putTime);
            this.putLocal({status: this.status, startTime: this.stopWatchToShow, diffPoint: putTime});
        } else {
            const putTime = moment().diff(this.diffTime);
            this.timerService.showClock(putTime);
            this.putLocal({status: this.status, startTime: this.stopWatchToShow, diffPoint: putTime});
        }
    }

    pause() {
        this.status = 'PAUSE';
        this.btnStatus = 'START';
        this.timerService.stopTimer();
        this.putLocal({status: this.status, startTime: this.stopWatchToShow, diffPoint: moment().diff(this.diffTime)});
    }

    reset() {
        this.lapArr = [];
        this.diffTime = 0;
        this.btnStatus = 'START';
        this.timerService.stopTimer();
        localStorage.setItem('lapState', JSON.stringify(this.lapArr));
        this.formatTime(this.stopWatch = {minutes: 0, seconds: 0, milliseconds: 0});
        this.putLocal({status: 'RESET'});
    }

    initSubscribeEvent() {
        this.source$ = fromEvent(window, 'storage');
        this.source$.pipe().subscribe(
            () => {
                this.initDuplicate();
            }
        );
    }

    initDuplicate() {
        let timeState: toLocalStore = JSON.parse(localStorage.getItem('timeState'));
        let lapState: lap[] = JSON.parse(localStorage.getItem('lapState'));
        if (timeState) {
            if (timeState.status === 'START') {
                this.startInit(timeState.diffPoint);
            } else if (timeState.status === 'PAUSE') {
                this.pauseInit(timeState.startTime);
            } else {
                this.resetInit();
            }
        }
        if (lapState) {
            this.lapArr = lapState;
        }
    }

    private startInit(diffPoint) {
        this.status = 'START';
        this.btnStatus = 'PAUSE';
        this.timerService.showClock(diffPoint);
    }

    private pauseInit(startTime) {
        this.status = 'PAUSE';
        this.btnStatus = 'START';
        this.stopWatchToShow = startTime;
        this.timerService.stopTimer();
    }

    private resetInit() {
        this.status = 'RESET';
        this.btnStatus = 'START';
        this.stopWatch = {minutes: 0, seconds: 0, milliseconds: 0};
        this.timerService.stopTimer();
        this.formatTime({minutes: 0, seconds: 0, milliseconds: 0});
    }

    private formatTime(stopWatch: stopWatchModel) {
        this.stopWatchToShow = {
            minutes: this.checkValue(stopWatch.minutes),
            seconds: this.checkValue(stopWatch.seconds),
            milliseconds: this.checkValue(stopWatch.milliseconds)
        };
    }

    private checkValue(checkNum: number) {
        return checkNum < 10 ? checkNum.toString().padStart(2, '0') : checkNum.toString();
    }

    private putLocal(store: toLocalStore) {
        localStorage.setItem('timeState', JSON.stringify(store));
    }
}
