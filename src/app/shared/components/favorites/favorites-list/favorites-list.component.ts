import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CategoryModel } from '@models/category.model';
import { FavoriteModel } from '@models/favorite.model';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss'],
})
export class FavoritesListComponent implements OnInit {

  @Input()
  allCategories: CategoryModel[];

  @Input()
  allFavorites: FavoriteModel[];

  @Output()
  OnDeleteFavorite: EventEmitter<any> = new EventEmitter<any>();

  private favoritesResults: FavoriteModel[];
  public categories = new Map;
  public numItemsSkeleton: number = 10;

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    if (this.allCategories !== undefined) {
      this.allCategories.map(category => {
        this.categories.set(category.id, category.slug);
      });
    }
    
    if (this.allFavorites !== undefined) {
      this.favoritesResults = this.allFavorites;
    }
  }

  favoriteDelete(favorite: { [key: string]: number | string }) {
    this.OnDeleteFavorite.emit({ favorite });
  }

  search(term: string | any) {
      setTimeout(() => {
        if (term.length >= 3) {
          this.allFavorites = this.allFavorites.filter(favorite => {
            return favorite.title.toLowerCase().includes(term.toLowerCase());
          });
        } else {
          this.allFavorites = this.favoritesResults;
        }
      }, 200);
  }

}
