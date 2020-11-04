import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { select, Store } from '@ngrx/store';
import { AppState } from '@shared/store/state/app.state';
import { selectCategory } from '@modules/categories/store/selectors/categories.selectors';
import * as CATEGORY_ACTIONS from '@modules/categories/store/actions/categories.actions';
import { CategoryModel } from '@models/category.model';
import { CategoryService } from '@services/category/category.service';
import { LoggerService } from '@services/logger/logger.service';

@Component({
  selector: 'app-categories-edit-page',
  templateUrl: './categories-edit.page.html',
  styleUrls: ['./categories-edit.page.scss'],
})
export class CategoriesEditPage implements OnInit, OnDestroy {

  private categorySubscription: Subscription;
  public category: CategoryModel;
  public currentCategory: string;

  constructor(
    private toastController: ToastController,
    private router: ActivatedRoute,
    private categoryService: CategoryService,
    private loggerService: LoggerService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.currentCategory = this.router.snapshot.params.slug;

    this.store.dispatch(CATEGORY_ACTIONS.loadCategories())
    this.categorySubscription = this.store
                                    .pipe(select(selectCategory, { slug: this.currentCategory }))
                                    .subscribe((category: CategoryModel) => this.category = category);
  }

  async editCategory(event) {
    await this.categoryService.edit(event.category);
    await this.store.dispatch(CATEGORY_ACTIONS.updateCategorySuccess({ category: event.category }));
    await this.loggerService.register(`has updated the category: ${ event.category.title }.`);
    await this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'The category has been updated.',
      duration: 2000,
      cssClass: 'is-success'
    });
    toast.present();
  }

  ngOnDestroy() {
    this.categorySubscription.unsubscribe();
  }

}
