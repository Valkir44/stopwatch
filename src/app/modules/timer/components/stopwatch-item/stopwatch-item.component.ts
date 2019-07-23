import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {lap} from "../../models/stop-watch.model";

@Component({
  selector: 'app-stopwatch-item',
  templateUrl: './stopwatch-item.component.html',
  styleUrls: ['./stopwatch-item.component.scss']
})
export class StopwatchItemComponent implements OnInit {
  @Input() lapArr: lap[];
  @Output() removeLap = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  remove(lapId) {
    this.removeLap.emit(lapId);
  }

}
