import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
    private categoryService: CategoryService,
    private favoriteService: FavoriteService,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.currentID = this.httpService.getParam('id');

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
    await setTimeout(() => this.router.navigate(['/']), 2000);
  }

}
