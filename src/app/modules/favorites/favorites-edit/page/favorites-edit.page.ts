import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@store/state/app.state';
import * as FAVORITE_ACTIONS from '@modules/favorites/store/actions/favorites.actions';
import * as CATEGORY_ACTIONS from '@modules/categories/store/actions/categories.actions';
import { CategoryModel } from '@models/category.model';
import { CategoryService } from '@services/category/category.service';
import { FavoriteService } from '@services/favorite/favorite.service';
import { HttpService } from '@http/http.service';
import { LoggerService } from '@services/logger/logger.service';

@Component({
  selector: 'app-favorites-edit-page',
  templateUrl: './favorites-edit.page.html',
  styleUrls: ['./favorites-edit.page.scss'],
})
export class FavoritesEditPage implements OnInit, OnDestroy {

  // public categories: CategoryModel[];
  // public favorite$: Observable<any>;
  public categories$;
  public favorite$;
  public currentID: string;

  constructor(
    private toastController: ToastController,
    private categoryService: CategoryService,
    private favoriteService: FavoriteService,
    private httpService: HttpService,
    private loggerService: LoggerService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.currentID = this.httpService.getQueryParam('id');

    this.favoriteService
        .getOne(this.currentID)
        .subscribe(favorite => { 
          this.favorite$ = favorite.payload.data();
        });

    this.store.select('categories').subscribe(({ categories }) => {
      this.categories$ = categories;
    });

    this.store.dispatch(CATEGORY_ACTIONS.loadCategories());
  }

  async editFavorite(event) {
   await this.favoriteService.edit(event.favorite);
   await this.store.dispatch(FAVORITE_ACTIONS.updateFavoriteSuccess({ favorite: event.favorite }));
   await this.loggerService.register(`has updated the favorite: ${ event.favorite.title }.`);
   await this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'The favorite has been updated.',
      duration: 2000,
      cssClass: 'is-success'
    });
    toast.present();
  }

  ngOnDestroy() {
    // this.categories$.unsubscribe();
    // this.favorite$.unsubscribe();
  }

}
