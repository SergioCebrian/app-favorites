import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-logs-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './logs-list.component.html',
  styleUrls: ['./logs-list.component.scss'],
})
export class LogsListComponent implements OnInit {

  @Input()
  allLogs: any;

  constructor() { }

  ngOnInit() { 
    this.allLogs = this.allLogs.reduce((ac,cv) => {
      ac[cv.date.formatted.title] = ac[cv.date.formatted.title] || [];
      ac[cv.date.formatted.title].push(cv);
      return ac;
    }, Object.create(null));
  }

  shortMonth(month: string): string {
    return month.substring(0, 3);
  }

  trackByFn(index: number, item: any): string | number {
    return item.id;
  }

}
