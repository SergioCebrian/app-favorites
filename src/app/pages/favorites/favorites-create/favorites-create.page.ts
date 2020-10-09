import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryService } from '@services/category/category.service';
import { FavoriteService } from '@services/favorite/favorite.service';

@Component({
  selector: 'app-favorites-create-page',
  templateUrl: './favorites-create.page.html',
  styleUrls: ['./favorites-create.page.scss'],
})
export class FavoritesCreatePage implements OnInit {

  public categories$: Observable<any>;

  constructor(
    private categoryService: CategoryService,
    private favoriteService: FavoriteService
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
        .then(resp => resp)
        .catch(err => console.error(err));
  }

}
