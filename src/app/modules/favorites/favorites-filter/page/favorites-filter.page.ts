import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { AppState } from '@shared/store/state/app.state';
import * as FAVORITE_ACTIONS from '@modules/favorites/store/actions/favorites.actions';
import { selectFavoritesByCategory, selectFavoritesByCategoryCount } from '@modules/favorites/store/selectors/favorites.selectors';
import { FavoriteModel } from '@models/favorite.model';
import { FavoriteService } from '@services/favorite/favorite.service';
import { AlertService } from '@services/alert/alert.service';
import { LoggerService } from '@services/logger/logger.service';
import { IInfiniteScroll } from '@interfaces/infinite-scroll';

@Component({
  selector: 'app-favorites-filter-page',
  templateUrl: './favorites-filter.page.html',
  styleUrls: ['./favorites-filter.page.scss'],
})
export class FavoritesFilterPage implements OnInit, OnDestroy {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  private favoritesSubscription: Subscription;
  public favorites: FavoriteModel[];
  public favoritesTotal: number = 0;
  public currentCategory: string;
  public infiniteScrollConfig: IInfiniteScroll = {
    start: 0,
    end: 10,
    increment: 10
  }

  constructor(
    private toastController: ToastController,
    private router: ActivatedRoute,
    private alertService: AlertService,
    private favoriteService: FavoriteService,
    private loggerService: LoggerService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.currentCategory = this.router.snapshot.params.category;

    this.store.dispatch(FAVORITE_ACTIONS.loadFavorites());
    this.store.pipe(select(selectFavoritesByCategoryCount, { category: this.currentCategory }))
              .subscribe(favorites => this.favoritesTotal = favorites);

    this.favoritesSubscription = this.store
                                     .pipe(select(selectFavoritesByCategory, 
                                      { category: this.currentCategory, ...this.infiniteScrollConfig }))
                                     .subscribe((favorites: FavoriteModel[]) => this.favorites = favorites);

  }

  /* =========================================================================
     +++++ Infinite Scrolling +++++
     ========================================================================= */

  loadData(event: any): void {
    this.infiniteScrollConfig.start += this.infiniteScrollConfig.increment;
    this.infiniteScrollConfig.end += this.infiniteScrollConfig.increment;
    
    setTimeout(() => { 
      this.favoritesSubscription = this.store.pipe(select(selectFavoritesByCategory, 
                                                { category: this.currentCategory, start: this.infiniteScrollConfig.start, end: this.infiniteScrollConfig.end }))
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
    await this.loggerService.register(`${favorite.title} has been ` + ((favorite.important) ? 'marked' : 'unmarked') + ' as a favorite.');
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

  ngOnDestroy() {
    this.favoritesSubscription.unsubscribe();
  }

}
