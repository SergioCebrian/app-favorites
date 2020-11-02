import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './page/home.page';
import { FavoritesListComponent } from '../favorites/favorites-list/favorites-list.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    FavoritesListComponent
  ],
  exports: [
    FavoritesListComponent
  ]
})
export class HomePageModule {}
