import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { AppState } from '@store/state/app.state';
import * as FAVORITE_ACTIONS from '@modules/favorites/store/actions/favorites.actions';
import { selectFavoritesLikes } from '@modules/favorites/store/selectors/favorites.selectors';
import { FavoriteModel } from '@models/favorite.model';
import { FavoriteService } from '@services/favorite/favorite.service';
import { LoggerService } from '@services/logger/logger.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.page.html',
  styleUrls: ['./likes.page.scss'],
})
export class LikesPage implements OnInit, OnDestroy {

  public favorites: FavoriteModel[];
  public favoritesSubscription: Subscription;

  constructor(
    private toastController: ToastController,
    private favoriteService: FavoriteService,
    private loggerService: LoggerService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(FAVORITE_ACTIONS.loadFavorites());
    this.favoritesSubscription = this.store
                                     .pipe(select(selectFavoritesLikes))
                                     .subscribe((favorites: FavoriteModel[]) => this.favorites = favorites);
  }

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
