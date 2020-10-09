import { Component, EventEmitter, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { FavoriteModel } from '@models/favorite.model';
import { FavoriteService } from '@services/favorite/favorite.service';
import { CategoryService } from '@services/category/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public categories$: Observable<any[]>;
  public favorites$: Observable<any[]>;

  constructor(
    private alertController: AlertController,
    private categoryService: CategoryService,
    private favoriteService: FavoriteService
  ) { }

  ngOnInit() {
    this.favoriteService
        .getAll()
        .subscribe(resp => {
          this.favorites$ = resp.map(favorite => {
            return {
              id: favorite.payload.doc.id,
              ...favorite.payload.doc.data()
            };
          });
        });

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

  favoriteDelete(event) {
    const { id, title } = event.favorite;
    this.favoriteService.delete(id);
    this.deleteAlert('Finished!', `The favorite ${ title } has been removed.`);
  }

  openModal(favorite: { [key: string]: number | string }) {
    // this.presentAlert('¿Are you sure?', `Press the confirm button to delete the favorite : ${ favorite.favorite.title }.`, favorite);
    this.presentAlert('¿Are you sure?', `Press the confirm button to delete the favorite : .`, favorite);
  }

  async presentAlert(title: string, msg: string, favorite: { [key: string]: number | string }) {
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
            this.favoriteDelete(favorite);
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
