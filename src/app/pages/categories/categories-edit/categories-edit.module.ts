import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriesEditPageRoutingModule } from './categories-edit-routing.module';

import { CategoriesEditPage } from './categories-edit.page';
import { CategoriesEditComponent } from '@components/categories/categories-edit/categories-edit.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    CategoriesEditPageRoutingModule
  ],
  declarations: [
    CategoriesEditComponent,
    CategoriesEditPage
  ],
  exports: [
    CategoriesEditComponent
  ]
})
export class CategoriesEditPageModule {}
