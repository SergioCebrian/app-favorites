import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { AppState } from '@store/state/app.state';
import { FavoritesState } from '@modules/favorites/store/state/favorites.state';
import * as FAVORITE_ACTIONS from '@modules/favorites/store/actions/favorites.actions';
import * as LOGGER_ACTIONS from '@modules/logger/store/actions/logger.actions';
import { selectFavorites, selectFavoritesHistory } from '@modules/favorites/store/selectors/favorites.selectors';
import { selectLogger } from '@modules/logger/store/selectors/logger.selectors';
import { FavoriteService } from '@services/favorite/favorite.service';
import { LoggerService } from '@services/logger/logger.service';
import { FavoriteModel } from '@models/favorite.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit, OnDestroy {

  public favorites: FavoriteModel[];
  public favoritesSubscription: Subscription;
  public logs$;

  constructor(
    private favoriteService: FavoriteService,
    private loggerService: LoggerService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(FAVORITE_ACTIONS.loadFavorites())
    this.favoritesSubscription = this.store
                                     .pipe(select(selectFavoritesHistory, { min: 10 }))
                                     .subscribe((favorites: FavoriteModel[]) => this.favorites = favorites);

    this.store.dispatch(LOGGER_ACTIONS.loadLogger());
    this.store.pipe(select(selectLogger))
              .subscribe(logger =>  console.log(logger));

    this.loggerService
        .getAll2()
        .subscribe(resp => {
          this.logs$ = resp.map(log => {
            return {
              id: log.payload.doc.id,
              ...log.payload.doc.data()
            }
          });
        });
  }

  incrementCounter(event): void {
    const { ...favorite } = event.favorite;
    this.favoriteService.editPartial(favorite.id, favorite);
  }

  ngOnDestroy() {
    this.favoritesSubscription.unsubscribe();
    // this.logs$.unsubscribe();
  }

}
