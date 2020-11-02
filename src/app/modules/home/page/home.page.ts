import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { AppState } from '@store/state/app.state';
import * as FAVORITE_ACTIONS from '@modules/favorites/store/actions/favorites.actions';
import { selectFavoritesAll } from '@modules/favorites/store/selectors/favorites.selectors';
import { FavoriteModel } from '@models/favorite.model';
import { FavoriteService } from '@services/favorite/favorite.service';
import { LoggerService } from '@services/logger/logger.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  public favorites: FavoriteModel[];
  public favoritesSubscription: Subscription;

  constructor(
    private alertController: AlertController,
    private favoriteService: FavoriteService,
    private loggerService: LoggerService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(FAVORITE_ACTIONS.loadFavorites());
    this.favoritesSubscription = this.store
                                     .pipe(select(selectFavoritesAll))
                                     .subscribe((favorites: FavoriteModel[]) => this.favorites = favorites);
  }

  async favoriteDelete(event): Promise<void> {
    const { id, title } = event.favorite;
    await this.favoriteService.delete(id);
    await this.loggerService.register(`has removed the favorite: ${ title }.`);
    await this.deleteAlert('Finished!', `The favorite ${ title } has been removed.`);
  }

  incrementCounter(event: { [key: string]: number | string | any }): void {
    const { ...favorite } = event.favorite;
    this.favoriteService.editPartial(favorite.id, favorite);
  }

  openModal(favorite: { [key: string]: number | string | any }): void {
    const { title } = favorite.favorite;
    this.presentAlert('¿Are you sure?', `Press the confirm button to delete the favorite: ${ title }.`, favorite);
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

  async deleteAlert(title: string, msg: string): Promise<void> {
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

  ngOnDestroy() {
    this.favoritesSubscription.unsubscribe();
  }

}
