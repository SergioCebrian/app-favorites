import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { AppState } from '@store/state/app.state';
import { FavoritesState } from '@modules/favorites/store/state/favorites.state';
import * as FAVORITE_ACTIONS from '@modules/favorites/store/actions/favorites.actions';
import { selectFavorites, selectFavoritesHistory, selectFavoritesHistoryCount } from '@modules/favorites/store/selectors/favorites.selectors';
import * as LOGGER_ACTIONS from '@modules/logger/store/actions/logger.actions';
import { selectLoggerAll } from '@modules/logger/store/selectors/logger.selectors';
import { FavoriteModel } from '@models/favorite.model';
import { FavoriteService } from '@services/favorite/favorite.service';
import { LoggerService } from '@services/logger/logger.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit, OnDestroy {

  @Input()
  currentTabActive: any;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  private favoritesSubscription: Subscription;
  private logsSubscription: Subscription;
  public favorites: FavoriteModel[];
  public favoritesTotal: number = 0;
  public logs;
  public tabsList: string[] = ['visits', 'logs'];
  public defaultTabActive: string = this.tabsList[0];
  public infiniteScrollingConfig: { [key: string]: number } = {
    start: 0,
    end: 10,
    increment: 10
  }

  constructor(
    private favoriteService: FavoriteService,
    private loggerService: LoggerService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(FAVORITE_ACTIONS.loadFavorites())
    this.favoritesSubscription = this.store
                                     .pipe(select(selectFavoritesHistoryCount, { min: 1 }))
                                     .subscribe(favorites => this.favoritesTotal = favorites) 
    this.favoritesSubscription = this.store
                                     .pipe(select(selectFavoritesHistory, 
                                        { 
                                          min: 1,
                                          start: this.infiniteScrollingConfig.start, 
                                          end: this.infiniteScrollingConfig.end 
                                        })
                                      )
                                     .subscribe((favorites: FavoriteModel[]) => this.favorites = favorites);

    this.store.dispatch(LOGGER_ACTIONS.loadLogger());
    this.logsSubscription = this.store
                                .pipe(select(selectLoggerAll))
                                .subscribe((logs: any) => {
                                  this.logs = logs;
                                  console.log('logs', logs)
                                });
    // TODO: Migrar a Redux  
    // this.loggerService.getAll().subscribe(resp => console.log(resp));       
  }

  /* =========================================================================
     +++++ Infinite Scrolling +++++
     ========================================================================= */

  loadData(event: any): void {
    this.infiniteScrollingConfig.start += this.infiniteScrollingConfig.increment;
    this.infiniteScrollingConfig.end += this.infiniteScrollingConfig.increment;

    setTimeout(() => {
      this.favoritesSubscription = this.store
                                       .pipe(
                                         select(selectFavoritesHistory, 
                                          { 
                                            min: 1, 
                                            start: this.infiniteScrollingConfig.start, 
                                            end: this.infiniteScrollingConfig.end 
                                          })
                                       )
                                      .subscribe((favorites: FavoriteModel[]) => {
                                        this.favorites = [
                                          ...this.favorites,
                                          ...favorites
                                        ]
                                      });
      event.target.complete();

      if (this.favorites.length === 106) {
        event.target.disabled = true;
      }
    }, 500);
  }
  
  /* =========================================================================
     +++++ Other functions +++++
     ========================================================================= */

  incrementCounter(event): void {
    const { ...favorite } = event.favorite;
    this.favoriteService.editPartial(favorite.id, favorite);
  }

  getCurrentTabActive(event): void {
    this.defaultTabActive = event.tab;
  }

  ngOnDestroy() {
    this.favoritesSubscription.unsubscribe();
    this.logsSubscription.unsubscribe();
  }

}
