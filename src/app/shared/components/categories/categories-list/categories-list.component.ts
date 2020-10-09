import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent implements OnInit {

  @Input()
  allCategories: any;

  @Output()
  OnDeleteCategory: EventEmitter<any> = new EventEmitter<any>();

  public numItemsSkeleton: number = 8;

  constructor() { }

  ngOnInit() { }

  categoryDelete(category: { [key: string]: number | string }) {
    this.OnDeleteCategory.emit({ category });
  }

}
