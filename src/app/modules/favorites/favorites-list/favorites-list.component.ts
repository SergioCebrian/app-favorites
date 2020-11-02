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
  OnIncrementCounterFavorite: EventEmitter<any> = new EventEmitter<any>();

  private favoritesResults: FavoriteModel[];
  public numItemsSkeleton: number = 10;

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {    
    if (this.allFavorites !== undefined) {
      this.favoritesResults = this.allFavorites;
    }
  }

  favoriteDelete(favorite: { [key: string]: number | string }) {
    this.OnDeleteFavorite.emit({ favorite });
  }

  incrementCounter(favorite): void {
    favorite.visits = favorite.visits + 1;
    this.OnIncrementCounterFavorite.emit({ favorite });
  }

  search(term: string | any) {
      setTimeout(() => {
        if (term.length >= 3) {
          this.allFavorites = this.allFavorites.filter(favorite => {
            return favorite.title.toLowerCase().includes(term.toLowerCase());
          });
        } else {
          this.allFavorites = this.favoritesResults;
        }
      }, 200);
  }

  trackByFn(index, item) {
    return item.id;
  }

}
