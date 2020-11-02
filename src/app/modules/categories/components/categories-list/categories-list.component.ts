import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-categories-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent implements OnInit {

  @Input()
  allCategories: any;

  @Output()
  OnDeleteCategory: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  categoryDelete(category: { [key: string]: number | string }) {
    this.OnDeleteCategory.emit({ category });
  }

  trackByFn(index: number, item: any): string | number {
    return item.id;
  }

}
