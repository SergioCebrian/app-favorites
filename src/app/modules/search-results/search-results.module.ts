import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SearchResultsPageRoutingModule } from './search-results-routing.module';
import { SearchResultsPage } from './page/search-results.page';
import { FavoritesResultsComponent } from '@modules/favorites/favorites-results/favorites-results.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SearchResultsPageRoutingModule
  ],
  declarations: [
    SearchResultsPage,
    FavoritesResultsComponent
  ],
  exports: [
    FavoritesResultsComponent
  ]
})
export class SearchResultsPageModule {}
