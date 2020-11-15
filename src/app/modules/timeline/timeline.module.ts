import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TimelinePageRoutingModule } from './timeline-routing.module';
import { TimelinePage } from './page/timeline.page';
import { TimelineHeaderComponent } from './components/timeline-header/timeline-header.component';
import { TimelineListComponent } from './components/timeline-list/timeline-list.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TimelinePageRoutingModule
  ],
  declarations: [
    TimelinePage,
    TimelineHeaderComponent,
    TimelineListComponent
  ],
  exports: [
    TimelineHeaderComponent,
    TimelineListComponent
  ]
})
export class TimelinePageModule {}
