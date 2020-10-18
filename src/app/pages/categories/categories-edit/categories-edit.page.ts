import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { CategoryService } from '@services/category/category.service';
import { HttpService } from '@http/http.service';

@Component({
  selector: 'app-categories-edit-page',
  templateUrl: './categories-edit.page.html',
  styleUrls: ['./categories-edit.page.scss'],
})
export class CategoriesEditPage implements OnInit {

  public category$: Observable<any>;
  public currentID: string;

  constructor(
    private toastController: ToastController,
    private categoryService: CategoryService,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.currentID = this.httpService.getQueryParam('id');

    this.categoryService
        .getOne(this.currentID)
        .subscribe(category => this.category$ = category.payload.data());
  }

  async editCategory(event) {
    await this.categoryService.edit(event.category);
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

}
