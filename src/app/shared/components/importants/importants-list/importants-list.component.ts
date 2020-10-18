import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CategoryModel } from '@models/category.model';
import { FavoriteModel } from '@models/favorite.model';

@Component({
  selector: 'app-importants-list',
  templateUrl: './importants-list.component.html',
  styleUrls: ['./importants-list.component.scss'],
})
export class ImportantsListComponent implements OnInit {

  @Input()
  allCategories: CategoryModel[];

  @Input()
  allFavorites: FavoriteModel[];

  @Output()
  OnDeleteImportant: EventEmitter<any> = new EventEmitter<any>();

  public categories = new Map;
  public numItemsSkeleton: number = 8;

  constructor() { }

  ngOnInit() {}

  ngOnChanges() {
    if (this.allCategories !== undefined) {
      this.allCategories.map(category => {
        this.categories.set(category.id, category.slug);
      });
    }
  }

  deleteImportant(favorite: { [ key : string] : any }): void {
    this.OnDeleteImportant.emit({ favorite });
  }

}
