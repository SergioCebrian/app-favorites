import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonInfiniteScroll } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from '@store/state/app.state';
import * as FAVORITE_ACTIONS from '@modules/favorites/store/actions/favorites.actions';
import { selectFavoritesAll, selectFavoritesCount, selectFavoritesSearch } from '@modules/favorites/store/selectors/favorites.selectors';
import { FavoriteModel } from '@models/favorite.model';
import { FavoriteService } from '@services/favorite/favorite.service';
import { LoggerService } from '@services/logger/logger.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  private favoritesSubscription: Subscription;
  public favorites: FavoriteModel[];
  public favoritesAll: FavoriteModel[];
  public favoritesTotal: number = 0;
  public infiniteScrollingConfig: { [key: string]: number } = {
    start: 0,
    end: 10,
    increment: 10
  }

  constructor(
    private alertController: AlertController,
    private favoriteService: FavoriteService,
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
                                       select(selectFavoritesAll, 
                                        { 
                                          start: this.infiniteScrollingConfig.start, 
                                          end: this.infiniteScrollingConfig.end 
                                        }))
                                     .subscribe((favorites: FavoriteModel[]) => {
                                       this.favorites = favorites;
                                       this.favoritesAll = favorites;
                                     });
  }

  /* =========================================================================
     +++++ Infinite Scrolling +++++
     ========================================================================= */

  loadData(event: any): void {
    this.infiniteScrollingConfig.start += this.infiniteScrollingConfig.increment;
    this.infiniteScrollingConfig.end += this.infiniteScrollingConfig.increment;

    setTimeout(() => {
      this.favoritesSubscription = this.store.pipe(select(selectFavoritesAll, { start: this.infiniteScrollingConfig.start, end: this.infiniteScrollingConfig.end }))
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

  incrementCounter(event: { [key: string]: number | string | any }): void {
    const { ...favorite } = event.favorite;
    this.favoriteService.editPartial(favorite.id, favorite);
  }

  // TODO: Usar pipes y mensaje de 'No hay resultados'
  search(event: string | any): void {
    const { term } = event;
    setTimeout(() => {
      /*this.favoritesSubscription = this.store
                                       .pipe(select(selectFavoritesSearch, { min: 3, term }))
                                       .subscribe((favorites: any) => this.favorites = favorites)*/
      if (term.length >= 3) {
        this.favorites = this.favorites.filter(favorite => {
          return favorite.title.toLowerCase().includes(term.toLowerCase());
        });
      } else {
        this.favorites = this.favoritesAll;
      }
    }, 200);
  }

  /* =========================================================================
     +++++ Modals +++++
     ========================================================================= */

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

  async favoriteDelete(event): Promise<void> {
    const { id, title } = event.favorite;
    await this.favoriteService.delete(id);
    await this.loggerService.register(`has removed the favorite: ${ title }.`);
    await this.deleteAlert('Finished!', `The favorite ${ title } has been removed.`);
  }

  ngOnDestroy() {
    this.favoritesSubscription.unsubscribe();
  }

}
