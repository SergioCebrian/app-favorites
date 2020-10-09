import { Component, EventEmitter, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { CategoryModel } from '@models/category.model';
import { CategoryService } from '@services/category/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  public categories$: Observable<any[]>;

  constructor(
    private alertController: AlertController,
    private categoryService: CategoryService
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

  categoryDelete(event) {
    const { id, title } = event.category;
    this.categoryService.delete(id);
    this.deleteAlert('Finished!', `The category ${ title } has been removed.`);
  }

  openModal(category: { [key: string]: number | string }) {
    // this.presentAlert('¿Are you sure?', `Press the confirm button to delete the category : ${ category.category.title }.`, category);
    this.presentAlert('¿Are you sure?', `Press the confirm button to delete the category : .`, category);
  }

  async presentAlert(title: string, msg: string, category: { [key: string]: number | string }) {
    const alertComponent = await this.alertController.create({
      cssClass: 'c-alert  c-alert--warning  has-before',
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Confirm',
          role: 'confirm',
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
      cssClass: 'c-alert  c-alert--success  has-before',
      header: title,
      subHeader: msg,
      buttons: ['Close']
    });

    await alertComponent.present();
  }

}
