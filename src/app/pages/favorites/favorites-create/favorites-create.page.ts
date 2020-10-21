import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { CategoryService } from '@services/category/category.service';
import { FavoriteService } from '@services/favorite/favorite.service';
import { LoggerService } from '@services/logger/logger.service';

@Component({
  selector: 'app-favorites-create-page',
  templateUrl: './favorites-create.page.html',
  styleUrls: ['./favorites-create.page.scss'],
})
export class FavoritesCreatePage implements OnInit {

  public categories$: Observable<any>;

  constructor(
    private toastController: ToastController,
    private categoryService: CategoryService,
    private favoriteService: FavoriteService,
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

  saveFavorite(event: any): void {
    this.favoriteService
        .save(event.favorite)
        .then(resp => {
          this.presentToast('The favorite has been created.');
          this.loggerService.register(`has created the favorite: ${ event.favorite.title }.`)
        })
        .catch(err => this.presentToast('Opps! The favorite could not be created.'));
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      cssClass: 'is-success'
    });
    toast.present();
  }

}
