import { Component, Input, OnInit } from '@angular/core';
import { ILogger } from '@interfaces/logger';

@Component({
  selector: 'app-timeline-list',
  templateUrl: './timeline-list.component.html',
  styleUrls: ['./timeline-list.component.scss'],
})
export class TimelineListComponent implements OnInit {

  @Input()
  timeline: ILogger[];

  constructor() { }

  ngOnInit() { }

}
