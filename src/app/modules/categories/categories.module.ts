import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CategoriesPageRoutingModule } from './categories-routing.module';
import { CategoriesPage } from './page/categories.page';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CategoriesPageRoutingModule
  ],
  declarations: [
    CategoriesListComponent,
    CategoriesPage
  ],
  exports: [
    CategoriesListComponent
  ]
})
export class CategoriesPageModule {}
