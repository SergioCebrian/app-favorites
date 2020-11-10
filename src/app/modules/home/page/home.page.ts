import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from '@store/state/app.state';
import * as FAVORITE_ACTIONS from '@modules/favorites/store/actions/favorites.actions';
import { selectFavoritesAll, selectFavoritesCount, selectFavoritesSearch } from '@modules/favorites/store/selectors/favorites.selectors';
import { FavoriteModel } from '@models/favorite.model';
import { FavoriteService } from '@services/favorite/favorite.service';
import { AlertService } from '@services/alert/alert.service';
import { LoggerService } from '@services/logger/logger.service';
import { InfiniteScrollService } from '@services/infinite-scroll/infinite-scroll.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  private favoritesSubscription: Subscription;
  public favorites: FavoriteModel[];
  public favoritesTotal: number = 0;

  constructor(
    private toastController: ToastController,
    private alertService: AlertService,
    private favoriteService: FavoriteService,
    private infiniteScrollService: InfiniteScrollService,
    private loggerService: LoggerService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(FAVORITE_ACTIONS.loadFavorites());
    this.store
        .pipe(select(selectFavoritesCount))
        .subscribe(favorites => this.favoritesTotal = favorites);

    this.favoritesSubscription = this.store
                                     .pipe(
                                       select(selectFavoritesAll, this.infiniteScrollService.infiniteScrollConfig))
                                     .subscribe((favorites: FavoriteModel[]) => this.favorites = favorites);
  }

  /* =========================================================================
     +++++ Infinite Scrolling +++++
     ========================================================================= */

  getData(event: any): void {
    this.favoritesSubscription = this.store
                                      .pipe(select(selectFavoritesAll, this.infiniteScrollService.infiniteScrollConfig))
                                      .subscribe((favorites: FavoriteModel[]) => {
                                        this.favorites = [ ...this.favorites, ...favorites ]
                                      });
    event.target.complete();
    if (this.favorites.length === this.favoritesTotal) {
      event.target.disabled = true;
    }
  }

  loadData(event: any): void {
    this.infiniteScrollService.incrementRangeData();
    setTimeout(() => { 
      this.infiniteScrollService.loadData(this.getData(event));
      // this.infiniteScrollService.loadFinalize(event, { itemsLoad: this.favorites, itemsTotal: this.favoritesTotal });
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

  incrementCounter(event: { [key: string]: number | string | any }): void {
    const { ...favorite } = event.favorite;
    this.favoriteService.editPartial(favorite.id, favorite);
  }

  // TODO: Mensaje de 'No hay resultados'
  search(event: string | any): void {
    const { term } = event;
    setTimeout(() => {
      this.favoritesSubscription = this.store
                                       .pipe(select(selectFavoritesSearch, 
                                          { min: 3, term, ...this.infiniteScrollService.infiniteScrollConfig }
                                        ))
                                       .subscribe((favorites: any) => {
                                         this.favorites = favorites;
                                         this.favoritesTotal = favorites.length;
                                       });
    }, 200);
  }

  /* =========================================================================
     +++++ Alerts +++++
     ========================================================================= */

  openModal(favorite: { [key: string]: number | string | any }): void {
    const { title } = favorite.favorite;
    this.alertService.presentAlert({
      cssClass: 'c-alert--warning  has-before',
      header: 'Are you sure?',
      message: `Press the confirm button to delete the favorite: ${ title }.`,
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

  async favoriteDelete(event): Promise<void> {
    const { id, title } = event.favorite;
    await this.favoriteService.delete(id);
    await this.loggerService.register(`has removed the favorite: ${ title }.`);
    this.alertService.presentAlert({
      cssClass: 'c-alert  c-alert--success  has-before  has-only-button',
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

  ngOnDestroy() {
    this.infiniteScrollService.resetConfig();
    this.favoritesSubscription.unsubscribe();
  }

}
