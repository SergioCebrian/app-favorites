import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { AppState } from '@shared/store/state/app.state';
import { selectOneLogger } from '@modules/logger/store/selectors/logger.selectors';
import { ILogger } from '@interfaces/logger';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {

  public currentTimeline: ILogger[];
  public currentTimelineMonth: string;
  public currentTimelineParam: string;

  constructor(
    private activatedRouter: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.currentTimelineParam = this.activatedRouter.snapshot.params.timeline;
    this.currentTimelineMonth = this.currentTimelineParam.split('-')[2];
    this.store.pipe(select(selectOneLogger, { logger: this.currentTimelineParam }))
              .subscribe((logger: ILogger[]) => this.currentTimeline = logger);
  }

}
