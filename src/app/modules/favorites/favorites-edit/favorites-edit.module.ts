import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FavoritesEditPageRoutingModule } from './favorites-edit-routing.module';
import { FavoritesEditPage } from './page/favorites-edit.page';
import { FavoritesEditComponent } from './components/favorites-edit.component';
import { SharedModule } from '@shared/shared.module';

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
