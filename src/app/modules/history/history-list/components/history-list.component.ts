import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FavoriteModel } from '@models/favorite.model';

@Component({
  selector: 'app-history-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss'],
})
export class HistoryListComponent implements OnInit {

  @Input()
  allFavorites: FavoriteModel[];

  @Input()
  allLogs: [];

  @Output()
  OnIncrementCounterFavorite: EventEmitter<any> = new EventEmitter<any>();

  public numItemsSkeleton: number = 8;
  public tabsList: string[] = ['visits', 'logs'];
  public currentTabActive: string = this.tabsList[0];
  public logsList: any;

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    if (this.allLogs !== undefined) {
      this.logsList = this.allLogs.reduce<Record<string, string>>((ac: any, cv: any) => {
        ac[cv.date.formatted] = ac[cv.date.formatted] || [];
        ac[cv.date.formatted].push(cv);
        return ac;
      }, Object.create(null));
    }
    
  }

  segmentChanged(event: any): void {
    this.currentTabActive = event.detail.value;
  }

  incrementCounter(favorite): void {
    favorite.visits = favorite.visits + 1;
    this.OnIncrementCounterFavorite.emit({ favorite });
  }

  counter(i) {
    return new Array(i)
  }

  trackByFn(index, item) {
    return item.id;
  }

}