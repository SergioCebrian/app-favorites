import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { AppState } from '@store/state/app.state';
import * as CATEGORY_ACTIONS from '@modules/categories/store/actions/categories.actions';
import * as FAVORITE_ACTIONS from '@modules/favorites/store/actions/favorites.actions';
import { selectCategoriesCount } from '@modules/categories/store/selectors/categories.selectors';
import { 
  selectFavoritesCount, 
  selectFavoritesHistory, 
  selectFavoritesHistoryCount, 
  selectFavoritesLikes, 
  selectFavoritesLikesCount} from '@modules/favorites/store/selectors/favorites.selectors';
import { HttpService } from '@http/http.service';

@Component({
  selector: 'app-tabs',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {

  @Input()
  active: string;

  public totalCategories: number;
  public totalFavorites: number;
  public totalFavoritesHistory: number;
  public totalFavoritesLikes: number;

  constructor(
    private httpService: HttpService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(FAVORITE_ACTIONS.loadFavorites());
    this.store.pipe(select(selectFavoritesCount))
              .subscribe(favorites => this.totalFavorites = favorites);

    this.store.pipe(select(selectFavoritesHistoryCount, { min: 1 }))
              .subscribe(favorites => this.totalFavoritesHistory = favorites);
              
    this.store.pipe(select(selectFavoritesLikesCount))
              .subscribe(favorites => this.totalFavoritesLikes = favorites);
    
    this.store.dispatch(CATEGORY_ACTIONS.loadCategories());
    this.store.pipe(select(selectCategoriesCount))
              .subscribe(categories => this.totalCategories = categories);
  }

  redirectUrl(url: string): void {
   this.httpService.redirectUrl(url);
  }

}
