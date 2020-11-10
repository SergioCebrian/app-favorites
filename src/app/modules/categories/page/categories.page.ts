import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { AppState } from '@store/state/app.state';
import * as CATEGORY_ACTIONS from '@modules/categories/store/actions/categories.actions';
import { selectCategoriesCount, selectCategoriesRange } from '../store/selectors/categories.selectors';
import { CategoryModel } from '@models/category.model';
import { CategoryService } from '@services/category/category.service';
import { AlertService } from '@services/alert/alert.service';
import { InfiniteScrollService } from '@services/infinite-scroll/infinite-scroll.service';
import { LoggerService } from '@services/logger/logger.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit, OnDestroy {

  private categoriesSubscription: Subscription;
  public categories: CategoryModel[];
  public categoriesTotal: number = 0;

  constructor(
    private alertService: AlertService,
    private categoryService: CategoryService,
    private infiniteScrollService: InfiniteScrollService,
    private loggerService: LoggerService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(CATEGORY_ACTIONS.loadCategories());
    this.store
        .pipe(select(selectCategoriesCount))
        .subscribe(favorites => this.categoriesTotal = favorites);

    this.categoriesSubscription = this.store
                                      .pipe(select(selectCategoriesRange, this.infiniteScrollService.setInfiniteScrollParams({ end: 4, increment: 4 })))
                                      .subscribe((categories: CategoryModel[]) => this.categories = categories);
  }

 /* =========================================================================
     +++++ Infinite Scrolling +++++
     ========================================================================= */

  getData(event: any): void {
    this.categoriesSubscription = this.store
                                      .pipe(select(selectCategoriesRange, this.infiniteScrollService.infiniteScrollConfig))
                                      .subscribe((categories: any) => {
                                        this.categories = [
                                          ...this.categories,
                                          ...categories
                                        ]
                                      });
    event.target.complete();
    if (this.categories.length === this.categoriesTotal) {
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

  categoryDelete(event: any): void {
    const { id, title } = event.category;
    this.categoryService.delete(id);
    this.store.dispatch(CATEGORY_ACTIONS.deleteCategorySuccess({ id }));
    this.loggerService.register(`has deleted the category: ${ title }.`);
    this.alertService.presentAlert({
      cssClass: 'c-alert--success  has-before  has-only-button',
      header: 'Finished!',
      message: `The category ${ title } has been removed.`,
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          cssClass: 'is-success'
        }
      ]
    });
  }

  openModal(category: { [key: string]: number | string | any }): void {
    const { title } = category.category;
    this.alertService.presentAlert({
      cssClass: 'c-alert--warning  has-before',
      header: 'Are you sure?',
      message: `Press the confirm button to delete the category: ${ title }.`,
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
            this.categoryDelete(category);
          }
        }
      ]
    });
  }

  ngOnDestroy() {
    this.infiniteScrollService.resetConfig();
    this.categoriesSubscription.unsubscribe();
  }

}
