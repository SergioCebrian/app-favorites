import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { AppState } from '@store/state/app.state';
import * as FAVORITE_ACTIONS from '@modules/favorites/store/actions/favorites.actions';
import { selectFavoritesHistory, selectFavoritesHistoryCount } from '@modules/favorites/store/selectors/favorites.selectors';
import * as LOGGER_ACTIONS from '@modules/logger/store/actions/logger.actions';
import { selectLoggerAll } from '@modules/logger/store/selectors/logger.selectors';
import { FavoriteModel } from '@models/favorite.model';
import { FavoriteService } from '@services/favorite/favorite.service';
import { AlertService } from '@services/alert/alert.service';
import { LoggerService } from '@services/logger/logger.service';
import { IInfiniteScroll } from '@interfaces/infinite-scroll';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit, OnDestroy {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  @Input()
  currentTabActive: any;

  private favoritesSubscription: Subscription;
  private logsSubscription: Subscription;
  public favorites: FavoriteModel[];
  public favoritesTotal: number = 0;
  public logs;
  public tabsList: string[] = ['visits', 'logs'];
  public defaultTabActive: string = this.tabsList[0];
  public infiniteScrollConfig: IInfiniteScroll = {
    start: 0,
    end: 10,
    increment: 10
  }

  constructor(
    private toastController: ToastController,
    private alertService: AlertService,
    private favoriteService: FavoriteService,
    private loggerService: LoggerService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(FAVORITE_ACTIONS.loadFavorites())
    this.favoritesSubscription = this.store
                                     .pipe(select(selectFavoritesHistoryCount, { min: 1 }))
                                     .subscribe(favorites => this.favoritesTotal = favorites);
    
    this.favoritesSubscription = this.store
                                     .pipe(select(selectFavoritesHistory, 
                                        { min: 1, ...this.infiniteScrollConfig }))
                                     .subscribe((favorites: FavoriteModel[]) => this.favorites = favorites);

    this.store.dispatch(LOGGER_ACTIONS.loadLogger());
    this.logsSubscription = this.store
                                .pipe(select(selectLoggerAll))
                                .subscribe((logs: any) => this.logs = logs);     
  }

  /* =========================================================================
     +++++ Infinite Scrolling +++++
     ========================================================================= */

  loadData(event: any): void {
    this.infiniteScrollConfig.start += this.infiniteScrollConfig.increment;
    this.infiniteScrollConfig.end += this.infiniteScrollConfig.increment;

    setTimeout(() => { 
      this.favoritesSubscription = this.store
                                        .pipe(select(selectFavoritesHistory, 
                                          { min: 1, ...this.infiniteScrollConfig }
                                        ))
                                        .subscribe((favorites: FavoriteModel[]) => {
                                          this.favorites = [ ...this.favorites, ...favorites ]
                                        });
      event.target.complete();
      if (this.favorites.length === this.favoritesTotal) {
        event.target.disabled = true;
      }
    }, 500);
  }
  
  /* =========================================================================
     +++++ Other functions +++++
     ========================================================================= */

  async changeLikeState(data: { [key: string]: number | string | any }): Promise<void> {
    const { favorite } = data;
    await this.favoriteService.edit(favorite);
    await this.store.dispatch(FAVORITE_ACTIONS.updateFavoriteSuccess({ favorite }));
    await this.loggerService.register(`has changed the property 'important' of favorite: ${ favorite.title }.`);
    await this.presentToast({ title: favorite.title, like: favorite.important });
  }
    
  async presentToast(data: { [key: string]: string | boolean }): Promise<void> {
    const toast = await this.toastController.create({
      message: `${data.title} has been ` + ((data.like) ? 'marked' : 'unmarked') + ' as a favorite.',
      duration: 2000,
      cssClass: 'is-success'
    });
    toast.present();
  }

  favoriteDelete(event) {
    const { id, title } = event.favorite;
    this.favoriteService.delete(id);
    this.loggerService.register(`has removed the favorite: ${ title }.`);
    this.alertService.presentAlert({
      cssClass: 'c-alert--success  has-before  has-only-button',
      header: 'Finished!',
      message: `The favorite ${ title } has been removed.`,
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          cssClass: 'is-success'
        }
      ]
    });
  }

  openModal(favorite: { [key: string]: number | string | any }) {
    const { title } = favorite.favorite;
    this.alertService.presentAlert({
      cssClass: 'c-alert--warning  has-before',
      header: 'Are you sure?',
      message: `Press the confirm button to delete the favorite:  ${ title }.`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'is-error'
        }, 
        {
          text: 'Confirm',
          role: 'confirm',
          cssClass: 'is-success',
          handler: () => {
            this.favoriteDelete(favorite);
          }
        } 
      ]
    });
  }

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
