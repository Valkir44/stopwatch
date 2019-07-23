import {Component} from '@angular/core';

@Component({
    selector: 'app-timer-container.page',
    template: `
        <div class="stopwatch">
            <app-stopwatch></app-stopwatch>
        </div>
    `,
    styleUrls: ['./timer-container.page.component.scss']
})
export class TimerContainerPageComponent {
}
