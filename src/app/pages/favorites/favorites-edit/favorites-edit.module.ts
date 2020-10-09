import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritesEditPageRoutingModule } from './favorites-edit-routing.module';

import { FavoritesEditPage } from './favorites-edit.page';
import { FavoritesEditComponent } from '@components/favorites/favorites-edit/favorites-edit.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    FavoritesEditPageRoutingModule
  ],
  declarations: [
    FavoritesEditComponent,
    FavoritesEditPage
  ],
  exports: [
    FavoritesEditComponent
  ]
})
export class FavoritesEditPageModule {}
