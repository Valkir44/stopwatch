import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TimerContainerPageComponent} from "./modules/timer/page/timer-container.page/timer-container.page.component";
import {CommonModule} from "@angular/common";


const routes: Routes = [
    {
        path: '',
        component: TimerContainerPageComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
