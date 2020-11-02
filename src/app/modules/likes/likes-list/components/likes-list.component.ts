import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FavoriteModel } from '@models/favorite.model';

@Component({
  selector: 'app-likes-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './likes-list.component.html',
  styleUrls: ['./likes-list.component.scss'],
})
export class LikesListComponent implements OnInit {

  @Input()
  allFavorites: FavoriteModel[];

  @Output()
  OnDeleteLike: EventEmitter<any> = new EventEmitter<any>();

  public numItemsSkeleton: number = 8;

  constructor() { }

  ngOnInit() {}

  deleteLike(favorite: { [ key : string] : any }): void {
    this.OnDeleteLike.emit({ favorite });
  }

  trackByFn(index, item) {
    return item.id;
  }

}
