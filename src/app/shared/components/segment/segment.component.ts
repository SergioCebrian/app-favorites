import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.scss'],
})
export class SegmentComponent implements OnInit {

  @Input()
  allTabs: string[];

  @Input()
  defaultTabActive: string;

  @Output()
  OnCurrentTabActive: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  segmentChanged(event): void {
    this.OnCurrentTabActive.emit({ tab: event.detail.value });
  }

}
