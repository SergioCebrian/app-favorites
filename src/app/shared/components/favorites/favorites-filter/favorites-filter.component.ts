import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FavoriteModel } from '@models/favorite.model';

@Component({
  selector: 'app-favorites-filter',
  templateUrl: './favorites-filter.component.html',
  styleUrls: ['./favorites-filter.component.scss'],
})
export class FavoritesFilterComponent implements OnInit {

  @Input()
  allFavorites: FavoriteModel[];

  @Input()
  category: string;

  @Output()
  OnDeleteFavorite: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  OnIncrementCounterFavorite: EventEmitter<any> = new EventEmitter<any>();

  public numItemsSkeleton: number = 10;

  constructor() { }

  ngOnInit() { }

  favoriteDelete(favorite: { [key: string]: number | string }) {
    this.OnDeleteFavorite.emit({ favorite });
  }

  incrementCounter(favorite): void {
    favorite.visits = favorite.visits + 1;
    this.OnIncrementCounterFavorite.emit({ favorite });
  }

}
