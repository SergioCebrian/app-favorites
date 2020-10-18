import { Component, Input, OnInit } from '@angular/core';

import { FavoriteModel } from '@models/favorite.model';
import { CategoryModel } from '@models/category.model';
import { FavoriteService } from '@services/favorite/favorite.service';
import { CategoryService } from '@services/category/category.service';
import { HttpService } from '@http/http.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {

  @Input()
  active: string;

  public totalCategories: CategoryModel[];
  public totalFavorites: FavoriteModel[];
  public totalFavoritesHistory: FavoriteModel[];
  public totalFavoritesImportants: FavoriteModel[];

  constructor(
    private categoryService: CategoryService,
    private favoriteService: FavoriteService,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.favoriteService
        .getAll()
        .subscribe(resp => {
          this.totalFavorites = resp.map(favorite => {
            return {
              id: favorite.payload.doc.id,
              ...favorite.payload.doc.data()
            };          
          }).length;
        });

    this.favoriteService
        .getAllByVisits()
        .subscribe(resp => {
          this.totalFavoritesHistory = resp.map(favorite => {
            return {
              id: favorite.payload.doc.id,
              ...favorite.payload.doc.data()
            };          
          }).length;
        });

    this.favoriteService
        .getAllByImportants()
        .subscribe(resp => {
          this.totalFavoritesImportants = resp.map(favorite => {
            return {
              id: favorite.payload.doc.id,
              ...favorite.payload.doc.data()
            };          
          }).length;
        });

    this.categoryService
        .getAll()
        .subscribe(resp => {
          this.totalCategories = resp.map(category => {
            return {
              id: category.payload.doc.id,
              ...category.payload.doc.data()
            };
          }).length;
        });

    this.totalCategories = null;
    this.totalFavorites = null;
    this.totalFavoritesHistory = null;
    this.totalFavoritesImportants = null;
  }

  redirectUrl(url: string): void {
   this.httpService.redirectUrl(url);
  }

}
