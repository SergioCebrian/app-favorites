import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FavoriteModel } from '@models/favorite.model';

@Component({
  selector: 'app-favorites-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss'],
})
export class FavoritesListComponent implements OnInit {

  @Input()
  allFavorites: FavoriteModel[];

  @Output()
  OnDeleteFavorite: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  OnChangeLikeStateFavorite: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  OnIncrementCounterFavorite: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  favoriteDelete(favorite: { [key: string]: number | string }) {
    this.OnDeleteFavorite.emit({ favorite });
  }

  incrementCounter(favorite): void {
    const favoriteIncrement = { ...favorite, visits: favorite.visits + 1 };
    this.OnIncrementCounterFavorite.emit({ favorite: favoriteIncrement });
  }

  toggleLike(favorite): void {
    const favoriteUpdate = {
      ...favorite,
      important: !favorite.important
    };
    this.OnChangeLikeStateFavorite.emit({ favorite: favoriteUpdate });
  }

  trackByFn(index: number, item: any): string | number {
    return item.id;
  }

}
