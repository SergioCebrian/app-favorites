import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { AppState } from '@store/state/app.state';
import * as FAVORITE_ACTIONS from '@modules/favorites/store/actions/favorites.actions';
import { selectFavoritesLikes, selectFavoritesLikesCount } from '@modules/favorites/store/selectors/favorites.selectors';
import { FavoriteModel } from '@models/favorite.model';
import { FavoriteService } from '@services/favorite/favorite.service';
import { LoggerService } from '@services/logger/logger.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.page.html',
  styleUrls: ['./likes.page.scss'],
})
export class LikesPage implements OnInit, OnDestroy {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  private favoritesSubscription: Subscription;
  public favorites: FavoriteModel[];
  public favoritesTotal: number = 0;
  public infiniteScrollingConfig: { [key: string]: number } = {
    start: 0,
    end: 10,
    increment: 10
  }

  constructor(
    private toastController: ToastController,
    private favoriteService: FavoriteService,
    private loggerService: LoggerService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(FAVORITE_ACTIONS.loadFavorites());
    this.favoritesSubscription = this.store
                                     .pipe(select(selectFavoritesLikesCount))
                                     .subscribe(favorites => this.favoritesTotal = favorites) 
    this.favoritesSubscription = this.store
                                     .pipe(select(selectFavoritesLikes, 
                                        { 
                                          start: this.infiniteScrollingConfig.start, 
                                          end: this.infiniteScrollingConfig.end 
                                        })
                                     )
                                     .subscribe((favorites: FavoriteModel[]) => this.favorites = favorites);
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
                                          select(selectFavoritesLikes, 
                                          { 
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

  deleteLike(event): void {
    const { id, ...favorite } = event.favorite;
    favorite.important = false;
    this.favoriteService.editPartial(id, favorite);
    this.loggerService.register(`has changed the state of favorite: ${ favorite.title }.`);
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'The status of the favorite has been updated.',
      duration: 2000,
      cssClass: 'is-success'
    });
    toast.present();
  }

  ngOnDestroy() {
    this.favoritesSubscription.unsubscribe();
  }

}
