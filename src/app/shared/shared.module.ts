import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { BackbuttonComponent } from '@components/backbutton/backbutton.component';
import { CounterComponent } from '@components/counter/counter.component';
import { HeaderComponent } from '@components/header/header.component';
import { SearchComponent } from '@components/search/search.component';

import { ImageFallbackDirective } from './directives/image-fallback/image-fallback.directive';
import { TruncatePipe } from '@pipes/truncate/truncate.pipe';
import { FillPipe } from '@pipes/fill/fill.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    SearchComponent,
    CounterComponent,
    BackbuttonComponent,
    FillPipe,
    TruncatePipe,
    ImageFallbackDirective
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    HeaderComponent,
    SearchComponent,
    CounterComponent,
    BackbuttonComponent,
    FillPipe,
    TruncatePipe,
    ImageFallbackDirective
  ]
})
export class SharedModule { }
