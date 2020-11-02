import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FavoritesFilterPageRoutingModule } from './favorites-filter-routing.module';
import { FavoritesFilterPage } from './page/favorites-filter.page';
import { FavoritesFilterComponent } from './components/favorites-filter.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    FavoritesFilterPageRoutingModule
  ],
  declarations: [
    FavoritesFilterComponent,
    FavoritesFilterPage
  ],
  exports: [
    FavoritesFilterComponent
  ]
})
export class FavoritesFilterPageModule {}
