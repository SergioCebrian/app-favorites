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

  @Output()
  OnIncrementCounterFavorite: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  incrementCounter(favorite): void {
    const favoriteIncrement = { ...favorite, visits: favorite.visits + 1 };
    this.OnIncrementCounterFavorite.emit({ favorite: favoriteIncrement });
  }

  trackByFn(index: number, item: any): string | number {
    return item.id;
  }

}
