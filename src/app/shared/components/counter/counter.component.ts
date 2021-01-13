import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {

  @Input()
  flag?: string;

  @Input()
  counter: number;

  @Input()
  text: { [key: string]: string };

  constructor() { }

  ngOnInit() { }

}
