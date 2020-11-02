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
import { LoggerService } from '@services/logger/logger.service';

@Component({
  selector: 'app-favorites-create-page',
  templateUrl: './favorites-create.page.html',
  styleUrls: ['./favorites-create.page.scss'],
})
export class FavoritesCreatePage implements OnInit, OnDestroy {

  // public categories: CategoryModel[];
  public categories$;

  constructor(
    private toastController: ToastController,
    private categoryService: CategoryService,
    private favoriteService: FavoriteService,
    private loggerService: LoggerService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.select('categories').subscribe(({ categories }) => {
      this.categories$ = categories;
    });

    this.store.dispatch(CATEGORY_ACTIONS.loadCategories());
  }

  saveFavorite(event: any): void {
    this.favoriteService
        .save(event.favorite)
        .then(resp => {
          this.store.dispatch(FAVORITE_ACTIONS.createFavoriteSuccess({ favorite: event.favorite }));
          this.presentToast('The favorite has been created.');
          this.loggerService.register(`has created the favorite: ${ event.favorite.title }.`)
        })
        .catch(err => this.presentToast('Opps! The favorite could not be created.'));
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      cssClass: 'is-success'
    });
    toast.present();
  }

  ngOnDestroy() {
    // this.categories$.unsubscribe();
  }

}