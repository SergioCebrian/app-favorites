import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';

import { AppState } from '@shared/store/state/app.state';
import * as CATEGORY_ACTIONS from '@modules/categories/store/actions/categories.actions';
import { CategoryService } from '@services/category/category.service';
import { LoggerService } from '@services/logger/logger.service';

@Component({
  selector: 'app-categories-create-page',
  templateUrl: './categories-create.page.html',
  styleUrls: ['./categories-create.page.scss'],
})
export class CategoriesCreatePage implements OnInit {

  constructor(
    private toastController: ToastController,
    private categoryService: CategoryService,
    private loggerService: LoggerService,
    private store: Store<AppState>
  ) { }

  ngOnInit() { }

  saveCategory(event: any): void {
    this.categoryService
        .save(event.categoryData)
        .then(() => {
          this.store.dispatch(CATEGORY_ACTIONS.createCategorySuccess({ category: event.categoryData }));
          this.loggerService.register(`has created the category: ${ event.categoryData.title }.`);
          this.presentToast('The category has been created.', 'is-success')
        })
        .catch(err => this.presentToast('Opps! The category could not be created.', 'is-error'));
  }

  async presentToast(msg: string, customClass: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      cssClass: customClass
    });
    toast.present();
  }

}
