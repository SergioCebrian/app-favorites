import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { CategoryService } from '@services/category/category.service';
import { HttpService } from '@http/http.service';
import { LoggerService } from '@services/logger/logger.service';
import { Store } from '@ngrx/store';
import { AppState } from '@shared/store/state/app.state';
import * as CATEGORY_ACTIONS from '@modules/categories/store/actions/categories.actions';

@Component({
  selector: 'app-categories-edit-page',
  templateUrl: './categories-edit.page.html',
  styleUrls: ['./categories-edit.page.scss'],
})
export class CategoriesEditPage implements OnInit, OnDestroy {

  public category$; // : Observable<any>
  public currentID: string;

  constructor(
    private toastController: ToastController,
    private categoryService: CategoryService,
    private httpService: HttpService,
    private loggerService: LoggerService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.currentID = this.httpService.getQueryParam('id');

    this.categoryService
        .getOne(this.currentID)
        .subscribe(category => this.category$ = category.payload.data());
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
    this.category$.unsubscribe();
  }

}