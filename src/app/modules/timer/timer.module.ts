import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimerContainerPageComponent} from "./page/timer-container.page/timer-container.page.component";
import {StopwatchComponent} from "./components/stopwatch/stopwatch.component";
import {StopwatchItemComponent} from "./components/stopwatch-item/stopwatch-item.component";
import {TimerService} from "./timer.service";
import {FormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        TimerContainerPageComponent,
        StopwatchComponent,
        StopwatchItemComponent
    ],
    imports: [
        CommonModule,
        FormsModule,

    ],
    providers: [
        TimerService
    ]
})
export class TimerModule {
}
