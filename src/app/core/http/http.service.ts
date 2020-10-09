import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private activatedRouter: ActivatedRoute
  ) { }

  getParam(param: string) {
    return this.activatedRouter.snapshot.queryParams[param];
  }

}
