import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { PreloaderService } from '@services/preloader/preloader.service';

@Injectable()
export class PreloaderInterceptor implements HttpInterceptor {

    // https://firstclassjs.com/display-a-loader-on-every-http-request-using-interceptor-in-angular-7/
    constructor(
        public loaderService: PreloaderService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.loaderService.show();

        return next.handle(req).pipe(
            finalize(() => this.loaderService.hide())
        );

    }

}