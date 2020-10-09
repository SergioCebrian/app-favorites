import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-favorites-filter',
  templateUrl: './favorites-filter.component.html',
  styleUrls: ['./favorites-filter.component.scss'],
})
export class FavoritesFilterComponent implements OnInit {

  /*@Input()
  allCategories: any;*/

  /*@Input()
  allFavorites: any;*/

  @Output()
  OnDeleteFavorite: EventEmitter<any> = new EventEmitter<any>();

  private numItemsSkeleton: number = 10;
  // private categories = new Map;

  constructor() { }

  ngOnInit() { }

  /*ngOnChanges() {
    if (this.allCategories !== undefined) {
      this.allCategories.map(category => {
        this.categories.set(category.id, category.slug);
      });
    }
  }*/

  favoriteDelete(favorite: { [key: string]: number | string }) {
    this.OnDeleteFavorite.emit({ favorite });
  }

}
