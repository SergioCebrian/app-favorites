import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CategoryModel } from '@models/category.model';
import { FavoriteModel } from '@models/favorite.model';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss'],
})
export class HistoryListComponent implements OnInit {

  @Input()
  allCategories: CategoryModel[];

  @Input()
  allFavorites: FavoriteModel[];

  @Output()
  OnIncrementCounterFavorite: EventEmitter<any> = new EventEmitter<any>();

  public categories = new Map;
  public numItemsSkeleton: number = 8;
  public tabsList: string[] = ['visits', 'logs'];
  public currentTabActive: string = this.tabsList[0];

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    if (this.allCategories !== undefined) {
      this.allCategories.map(category => {
        this.categories.set(category.id, category.slug);
      });
    }
  }

  segmentChanged(event: any): void {
    this.currentTabActive = event.detail.value;
  }

  incrementCounter(favorite): void {
    favorite.visits = favorite.visits + 1;
    this.OnIncrementCounterFavorite.emit({ favorite });
  }

}
