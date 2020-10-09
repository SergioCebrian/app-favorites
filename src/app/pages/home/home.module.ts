import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { FavoritesListComponent } from '@components/favorites/favorites-list/favorites-list.component';
import { SharedModule } from 'app/shared/shared.module';

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
