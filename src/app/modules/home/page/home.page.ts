import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, ToastController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from '@store/state/app.state';
import * as FAVORITE_ACTIONS from '@modules/favorites/store/actions/favorites.actions';
import { selectFavoritesAll, selectFavoritesCount, selectFavoritesSearch } from '@modules/favorites/store/selectors/favorites.selectors';
import { FavoriteModel } from '@models/favorite.model';
import { FavoriteService } from '@services/favorite/favorite.service';
import { AlertService } from '@services/alert/alert.service';
import { LoggerService } from '@services/logger/logger.service';
import { IInfiniteScroll } from '@interfaces/infinite-scroll';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  private favoritesSubscription: Subscription;
  public favorites: FavoriteModel[];
  public favoritesTotal: number = 0;
  public infiniteScrollConfig: IInfiniteScroll = {
    start: 0,
    end: 10,
    increment: 10
  }

  constructor(
    private router: Router,
    private toastController: ToastController,
    private alertService: AlertService,
    private favoriteService: FavoriteService,
    private loggerService: LoggerService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(FAVORITE_ACTIONS.loadFavorites());
    this.store.pipe(select(selectFavoritesCount))
              .subscribe(favorites => this.favoritesTotal = favorites);

    this.favoritesSubscription = this.store
                                     .pipe(select(selectFavoritesAll, this.infiniteScrollConfig))
                                     .subscribe((favorites: FavoriteModel[]) => this.favorites = favorites);
  }

  search(event: any): void {
    const { term } = event;
    this.router.navigate(['/results'], { queryParams: { search: term } });
  }

  /* =========================================================================
     +++++ Infinite Scrolling +++++
     ========================================================================= */

  loadData(event: any): void {
    this.infiniteScrollConfig.start += this.infiniteScrollConfig.increment;
    this.infiniteScrollConfig.end += this.infiniteScrollConfig.increment;

    setTimeout(() => { 
      this.favoritesSubscription = this.store
                                       .pipe(select(selectFavoritesAll, { start: this.infiniteScrollConfig.start, end: this.infiniteScrollConfig.end }))
                                       .subscribe((favorites: FavoriteModel[]) => {
                                          this.favorites = [ ...this.favorites, ...favorites ];
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

  incrementCounter(event: { [key: string]: number | string | any }): void {
    const { ...favorite } = event.favorite;
    this.favoriteService.editPartial(favorite.id, favorite);
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
    this.favoritesSubscription.unsubscribe();
  }

}
