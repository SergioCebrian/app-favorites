import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryService } from '@services/category/category.service';
import { FavoriteService } from '@services/favorite/favorite.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  public categories$: Observable<any[]>;
  public favorites$: Observable<any[]>;

  constructor(
    private categoryService: CategoryService,
    private favoriteService: FavoriteService
  ) { }

  ngOnInit() {
    this.favoriteService
        .getAllByVisits()
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

  incrementCounter(event): void {
    const { ...favorite } = event.favorite;
    this.favoriteService.editPartial(favorite.id, favorite);
  }

}
