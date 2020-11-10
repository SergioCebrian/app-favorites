import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { AppState } from '@store/state/app.state';
import * as FAVORITE_ACTIONS from '@modules/favorites/store/actions/favorites.actions';
import { selectFavoritesLikes, selectFavoritesLikesCount } from '@modules/favorites/store/selectors/favorites.selectors';
import { FavoriteModel } from '@models/favorite.model';
import { FavoriteService } from '@services/favorite/favorite.service';
import { InfiniteScrollService } from '@services/infinite-scroll/infinite-scroll.service';
import { LoggerService } from '@services/logger/logger.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.page.html',
  styleUrls: ['./likes.page.scss'],
})
export class LikesPage implements OnInit, OnDestroy {

  private favoritesSubscription: Subscription;
  public favorites: FavoriteModel[];
  public favoritesTotal: number = 0;

  constructor(
    private toastController: ToastController,
    private favoriteService: FavoriteService,
    private infiniteScrollService: InfiniteScrollService,
    private loggerService: LoggerService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(FAVORITE_ACTIONS.loadFavorites());
    this.favoritesSubscription = this.store
                                     .pipe(select(selectFavoritesLikesCount))
                                     .subscribe(favorites => this.favoritesTotal = favorites) 
    this.favoritesSubscription = this.store
                                     .pipe(select(selectFavoritesLikes, this.infiniteScrollService.infiniteScrollConfig))
                                     .subscribe((favorites: FavoriteModel[]) => this.favorites = favorites);
  }

  /* =========================================================================
     +++++ Infinite Scrolling +++++
     ========================================================================= */

  getData(event: any): void {
    this.favoritesSubscription = this.store
                                      .pipe(select(selectFavoritesLikes, this.infiniteScrollService.infiniteScrollConfig))
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

  deleteLike(event): void {
    const { id, title, ...favorite } = event.favorite;
    favorite.important = false;
    this.favoriteService.editPartial(id, favorite);
    this.loggerService.register(`${ title } has been unmarked as a favorite.`);
    this.presentToast(title);
  }

  async presentToast(title: string): Promise<void> {
    const toast = await this.toastController.create({
      message: `${ title } has been unmarked as a favorite.`,
      duration: 2000,
      cssClass: 'is-success'
    });
    toast.present();
  }

  ngOnDestroy() {
    this.infiniteScrollService.resetConfig();
    this.favoritesSubscription.unsubscribe();
  }

}
