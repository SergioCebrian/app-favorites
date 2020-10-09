import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritesCreatePageRoutingModule } from './favorites-create-routing.module';

import { FavoritesCreatePage } from './favorites-create.page';
import { FavoritesCreateComponent } from '@components/favorites/favorites-create/favorites-create.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    FavoritesCreatePageRoutingModule
  ],
  declarations: [
    FavoritesCreateComponent,
    FavoritesCreatePage
  ],
  exports: [
    FavoritesCreateComponent
  ]
})
export class FavoritesCreatePageModule {}
