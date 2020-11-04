import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { AppState } from '@store/state/app.state';
import { selectCategoriesAll } from '@modules/categories/store/selectors/categories.selectors';
import { selectFavorite } from '@modules/favorites/store/selectors/favorites.selectors';
import * as CATEGORY_ACTIONS from '@modules/categories/store/actions/categories.actions';
import * as FAVORITE_ACTIONS from '@modules/favorites/store/actions/favorites.actions';
import { CategoryModel } from '@models/category.model';
import { FavoriteModel } from '@models/favorite.model';
import { CategoryService } from '@services/category/category.service';
import { FavoriteService } from '@services/favorite/favorite.service';
import { LoggerService } from '@services/logger/logger.service';

@Component({
  selector: 'app-favorites-edit-page',
  templateUrl: './favorites-edit.page.html',
  styleUrls: ['./favorites-edit.page.scss'],
})
export class FavoritesEditPage implements OnInit, OnDestroy {

  private categoriesSubscription: Subscription;
  private favoriteSubscription: Subscription;
  public categories: CategoryModel[];
  public favorite: FavoriteModel;
  public currentFavorite: string;

  constructor(
    private toastController: ToastController,
    private router: ActivatedRoute,
    private categoryService: CategoryService,
    private favoriteService: FavoriteService,
    private loggerService: LoggerService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.currentFavorite = this.router.snapshot.params.slug;

    this.store.dispatch(FAVORITE_ACTIONS.loadFavorites());
    this.favoriteSubscription = this.store
                                    .pipe(select(selectFavorite, { slug: this.currentFavorite }))
                                    .subscribe((favorite: FavoriteModel) => this.favorite = favorite);

    this.store.dispatch(CATEGORY_ACTIONS.loadCategories());
    this.categoriesSubscription = this.store
                                      .pipe(select(selectCategoriesAll))
                                      .subscribe((categories: CategoryModel[]) => this.categories = categories);
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
    this.categoriesSubscription.unsubscribe();
    this.favoriteSubscription.unsubscribe();
  }

}
