import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { CategoryService } from '@services/category/category.service';
import { FavoriteService } from '@services/favorite/favorite.service';
import { HttpService } from '@http/http.service';

@Component({
  selector: 'app-favorites-edit-page',
  templateUrl: './favorites-edit.page.html',
  styleUrls: ['./favorites-edit.page.scss'],
})
export class FavoritesEditPage implements OnInit {

  public categories$: Observable<any>;
  public favorite$: Observable<any>;
  public currentID: string;

  constructor(
    private toastController: ToastController,
    private categoryService: CategoryService,
    private favoriteService: FavoriteService,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.currentID = this.httpService.getQueryParam('id');

    this.favoriteService
        .getOne(this.currentID)
        .subscribe(favorite => { 
          this.favorite$ = favorite.payload.data();
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

  async editFavorite(event) {
    await this.favoriteService.edit(event.favorite);
    await this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'The favorite has been updated.',
      duration: 2000,
      cssClass: 'is-success'
    });
    toast.present();
  }

}
