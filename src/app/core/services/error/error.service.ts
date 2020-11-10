import { Injectable } from '@angular/core';
import { ErrorConfig } from '@configs/error.config';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  get({ code }): any {
    return {
      code : [code],
      message : ErrorConfig[code]
    }
  }

}
