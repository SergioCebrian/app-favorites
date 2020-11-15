import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInfiniteScroll, ToastController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from '@store/state/app.state';
import * as FAVORITE_ACTIONS from '@modules/favorites/store/actions/favorites.actions';
import { selectFavoritesCount, selectFavoritesSearch } from '@modules/favorites/store/selectors/favorites.selectors';
import { FavoriteModel } from '@models/favorite.model';
import { FavoriteService } from '@services/favorite/favorite.service';
import { AlertService } from '@services/alert/alert.service';
import { LoggerService } from '@services/logger/logger.service';
import { IInfiniteScroll } from '@interfaces/infinite-scroll';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.page.html',
  styleUrls: ['./search-results.page.scss'],
})
export class SearchResultsPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  private favoritesSubscription: Subscription;
  public favorites: FavoriteModel[];
  public favoritesTotal: number = 0;
  public searchTerm: string = '';
  public infiniteScrollConfig: IInfiniteScroll = {
    start: 0,
    end: 10,
    increment: 10
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastController: ToastController,
    private alertService: AlertService,
    private favoriteService: FavoriteService,
    private loggerService: LoggerService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => this.searchTerm = decodeURI(params.search));
    this.loggerService.register(`have searched results with ${ this.searchTerm }.`);

    this.store.dispatch(FAVORITE_ACTIONS.loadFavorites());
    this.store.pipe(select(selectFavoritesCount))
              .subscribe(favorites => this.favoritesTotal = favorites);
    
    this.getData();
  }

  getData(): void {
    this.favoritesSubscription = this.store.pipe(select(selectFavoritesSearch, { min: 3, term: this.searchTerm, ...this.infiniteScrollConfig }))
                                           .subscribe((favorites: FavoriteModel[]) => {
                                              this.favorites = favorites;
                                              this.favoritesTotal = favorites.length;
                                           });
  }

  search(event: any): void {
    const { term } = event;
    this.searchTerm = term;
    (this.searchTerm.length > 0)
      ? this.router.navigate(['/results'], { queryParams: { search: this.searchTerm } }) 
      : this.router.navigate(['/']);
    this.getData();
  }

  /* =========================================================================
     +++++ Infinite Scrolling +++++
     ========================================================================= */

  // TODO: Mensaje de 'No hay resultados'

  loadData(event: any): void {
    this.infiniteScrollConfig.start += this.infiniteScrollConfig.increment;
    this.infiniteScrollConfig.end += this.infiniteScrollConfig.increment;

    setTimeout(() => {
      this.favoritesSubscription = this.store
                                       .pipe(select(selectFavoritesSearch, { min: 3, term: this.searchTerm, ...this.infiniteScrollConfig }))
                                       .subscribe((favorites: FavoriteModel[]) => {
                                          this.favorites = favorites;
                                          this.favoritesTotal = favorites.length;
                                       });
      event.target.complete();
      if (this.favorites.length === this.favoritesTotal) {
        event.target.disabled = true;
      }
    }, 200);
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
