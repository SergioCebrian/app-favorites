import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) { }

  getQueryParam(param: string): string { // path?qs=value
    return this.activatedRouter.snapshot.queryParams[param];
  }

  getPathVar(param: string): any { // path/:param1/
    return this.activatedRouter.snapshot.params[param];
  }

  redirectUrl(url: string): void {
    this.router.navigateByUrl(url);
  }
}
