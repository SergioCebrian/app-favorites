import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonInfiniteScroll } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { AppState } from '@store/state/app.state';
import * as CATEGORY_ACTIONS from '@modules/categories/store/actions/categories.actions';
import { selectCategoriesCount, selectCategoriesRange } from '../store/selectors/categories.selectors';
import { CategoryModel } from '@models/category.model';
import { CategoryService } from '@services/category/category.service';
import { LoggerService } from '@services/logger/logger.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit, OnDestroy {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  private categoriesSubscription: Subscription;
  public categories: CategoryModel[];
  public categoriesTotal: number = 0;
  public infiniteScrollingConfig: { [key: string]: number } = {
    start: 0,
    end: 4,
    increment: 4
  }

  constructor(
    private alertController: AlertController,
    private categoryService: CategoryService,
    private loggerService: LoggerService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(CATEGORY_ACTIONS.loadCategories());
    this.store
        .pipe(select(selectCategoriesCount))
        .subscribe(favorites => this.categoriesTotal = favorites);

    this.categoriesSubscription = this.store
                                      .pipe(select(selectCategoriesRange, 
                                        { 
                                          start: this.infiniteScrollingConfig.start, 
                                          end: this.infiniteScrollingConfig.end 
                                        }))
                                      .subscribe((categories: CategoryModel[]) => this.categories = categories);
  }

 /* =========================================================================
     +++++ Infinite Scrolling +++++
     ========================================================================= */

     loadData(event: any): void {
      this.infiniteScrollingConfig.start += this.infiniteScrollingConfig.increment;
      this.infiniteScrollingConfig.end += this.infiniteScrollingConfig.increment;
  
      setTimeout(() => {
        this.categoriesSubscription = this.store.pipe(select(selectCategoriesRange, { start: this.infiniteScrollingConfig.start, end: this.infiniteScrollingConfig.end }))
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
    this.deleteAlert('Finished!', `The category ${ title } has been removed.`);
  }

  openModal(category: { [key: string]: number | string | any }): void {
    const { title } = category.category;
    this.presentAlert('¿Are you sure?', `Press the confirm button to delete the category: ${ title }.`, category);
  }

  async presentAlert(title: string, msg: string, category: { [key: string]: number | string }) {
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
            this.categoryDelete(category);
          }
        }
      ]
    });

    await alertComponent.present();
  }

  async deleteAlert(title: string, msg: string) {
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
    this.categoriesSubscription.unsubscribe();
  }

}
