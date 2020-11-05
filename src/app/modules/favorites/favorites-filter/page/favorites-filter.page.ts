import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonInfiniteScroll } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { select, Store } from '@ngrx/store';
import { AppState } from '@shared/store/state/app.state';
import * as FAVORITE_ACTIONS from '@modules/favorites/store/actions/favorites.actions';
import { selectFavoritesByCategory, selectFavoritesByCategoryCount } from '@modules/favorites/store/selectors/favorites.selectors';
import { FavoriteModel } from '@models/favorite.model';
import { FavoriteService } from '@services/favorite/favorite.service';
import { LoggerService } from '@services/logger/logger.service';

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
  public infiniteScrollingConfig: { [key: string]: number } = {
    start: 0,
    end: 10,
    increment: 10
  }

  constructor(
    private alertController: AlertController,
    private router: ActivatedRoute,
    private favoriteService: FavoriteService,
    private loggerService: LoggerService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.currentCategory = this.router.snapshot.params.category;

    this.store.dispatch(FAVORITE_ACTIONS.loadFavorites());
    this.store
        .pipe(select(selectFavoritesByCategoryCount, { category: this.currentCategory }))
        .subscribe(favorites => this.favoritesTotal = favorites);
    this.favoritesSubscription = this.store
                                     .pipe(select(selectFavoritesByCategory, 
                                      { 
                                        category: this.currentCategory,
                                        start: this.infiniteScrollingConfig.start, 
                                        end: this.infiniteScrollingConfig.end 
                                      }))
                                     .subscribe((favorites: FavoriteModel[]) => this.favorites = favorites);

  }

  /* =========================================================================
     +++++ Infinite Scrolling +++++
     ========================================================================= */

     loadData(event: any): void {
      this.infiniteScrollingConfig.start += this.infiniteScrollingConfig.increment;
      this.infiniteScrollingConfig.end += this.infiniteScrollingConfig.increment;
  
      setTimeout(() => {
        this.favoritesSubscription = this.store.pipe(select(selectFavoritesByCategory, 
                                                      { 
                                                        category: this.currentCategory,
                                                        start: this.infiniteScrollingConfig.start, 
                                                        end: this.infiniteScrollingConfig.end 
                                                      }))
        .subscribe((favorites: FavoriteModel[]) => {
          this.favorites = [
            ...this.favorites,
            ...favorites
          ]
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

  favoriteDelete(event) {
    const { id, title } = event.favorite;
    this.favoriteService.delete(id);
    this.loggerService.register(`has removed the favorite: ${ title }.`);
    this.deleteAlert('Finished!', `The favorite ${ title } has been removed.`);
  }

  openModal(favorite: { [key: string]: number | string | any }) {
    const { title } = favorite.favorite;
    this.presentAlert('¿Are you sure?', `Press the confirm button to delete the favorite:  ${ title }.`, favorite);
  }

  async presentAlert(title: string, msg: string, favorite: { [key: string]: number | string }) {
    const alertComponent = await this.alertController.create({
      cssClass: 'c-alert  c-alert--warning  has-before',
      header: title,
      message: msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'is-error'
        }, {
          text: 'Confirm',
          role: 'confirm',
          cssClass: 'is-success',
          handler: () => {
            this.favoriteDelete(favorite);
          }
        }
      ]
    });

    await alertComponent.present();
  }

  async deleteAlert(title: string, msg: string) {
    const alertComponent = await this.alertController.create({
      cssClass: 'c-alert  c-alert--success  has-before  has-only-button',
      header: title,
      message: msg,
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          cssClass: 'is-success'
        }
      ]
    });

    await alertComponent.present();
  }

  incrementCounter(event): void {
    const { ...favorite } = event.favorite;
    this.favoriteService.editPartial(favorite.id, favorite);
  } 

  ngOnDestroy() {
    this.favoritesSubscription.unsubscribe();
  }

}
