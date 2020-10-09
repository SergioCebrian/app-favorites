import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { PreloaderInterceptor } from '@interceptors/preloader/preloader.interceptor';
import { PreloaderService } from '@services/preloader/preloader.service';
import { PreloaderComponent } from '@components/preloader/preloader.component';

@NgModule({
  declarations: [
    PreloaderComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PreloaderComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PreloaderInterceptor,
      multi: true
    }
  ],
})
export class PreloaderModule { }