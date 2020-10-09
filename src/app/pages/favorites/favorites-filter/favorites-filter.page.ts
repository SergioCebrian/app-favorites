import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { FavoriteService } from '@services/favorite/favorite.service';
import { HttpService } from '@http/http.service';

@Component({
  selector: 'app-favorites-filter-page',
  templateUrl: './favorites-filter.page.html',
  styleUrls: ['./favorites-filter.page.scss'],
})
export class FavoritesFilterPage implements OnInit {

  private favorites$: Observable<any> | any;
  private currentID: string;

  constructor(
    private favoriteService: FavoriteService,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.currentID = this.httpService.getParam('id');
    this.favoriteService
        .getAllByCategory(this.currentID)
        .subscribe(resp => {
          this.favorites$ = resp.map(favorite => {
            return {
              id: favorite.payload.doc.id,
              ...favorite.payload.doc.data()
            }
          });
          console.log(this.favorites$)
        });
  } 

}
