import { Component, EventEmitter, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { CategoryModel } from '@models/category.model';
import { CategoryService } from '@services/category/category.service';
import { LoggerService } from '@services/logger/logger.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  public categories$: Observable<any[]>;

  constructor(
    private alertController: AlertController,
    private categoryService: CategoryService,
    private loggerService: LoggerService
  ) { }

  ngOnInit() {
    this.categoryService
        .getAll()
        .subscribe(resp => {
          this.categories$ = resp.map(category => {
            return {
              id: category.payload.doc.id,
              ...category.payload.doc.data()
            };
          });
        });
  }

  categoryDelete(event: any): void {
    const { id, title } = event.category;
    this.categoryService.delete(id);
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

}
