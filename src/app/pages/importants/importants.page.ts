import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryModel } from '@models/category.model';
import { FavoriteModel } from '@models/favorite.model';
import { CategoryService } from '@services/category/category.service';
import { FavoriteService } from '@services/favorite/favorite.service';

@Component({
  selector: 'app-importants',
  templateUrl: './importants.page.html',
  styleUrls: ['./importants.page.scss'],
})
export class ImportantsPage implements OnInit {

  public categories$: Observable<CategoryModel[]>;
  public favorites$: Observable<FavoriteModel[]>;

  constructor(
    private categoryService: CategoryService,
    private favoriteService: FavoriteService
  ) { }

  ngOnInit() {
    this.favoriteService
        .getAllByImportants()
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

  deleteImportant(event): void {
    const { id, ...favorite } = event.favorite;
    favorite.important = false;
    this.favoriteService.editPartial(id, favorite);
  }

}
