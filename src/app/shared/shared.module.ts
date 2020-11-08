import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { CounterComponent } from '@components/counter/counter.component';
import { HeaderComponent } from '@components/header/header.component';
import { HeaderTransparentComponent } from '@components/header/header-transparent/header-transparent.component';
import { SearchComponent } from '@components/search/search.component';
import { TabsComponent } from '@components/tabs/tabs.component';
import { SegmentComponent } from '@components/segment/segment.component';
import { SkeletonComponent } from '@components/skeleton/skeleton.component';
import { AccordionComponent } from '@components/accordion/accordion.component';

import { ImageFallbackDirective } from '@directives/image-fallback/image-fallback.directive';
import { TruncatePipe } from '@pipes/truncate/truncate.pipe';
import { FillPipe } from '@pipes/fill/fill.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderTransparentComponent,
    SearchComponent,
    CounterComponent,
    TabsComponent,
    SegmentComponent,
    SkeletonComponent,
    AccordionComponent,
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
    HeaderTransparentComponent,
    SearchComponent,
    CounterComponent,
    TabsComponent,
    SegmentComponent,
    SkeletonComponent,
    AccordionComponent,
    FillPipe,
    TruncatePipe,
    ImageFallbackDirective
  ]
})
export class SharedModule { }
