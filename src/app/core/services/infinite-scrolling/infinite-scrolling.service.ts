import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfiniteScrollingService {

  public infiniteScrollingConfig: { [key: string]: number } = {
    start: 0,
    end: 10,
    increment: 10
  }

  constructor() { }

  loadData(event: any, callback?: any): void {
    this.infiniteScrollingConfig.start += this.infiniteScrollingConfig.increment;
    this.infiniteScrollingConfig.end += this.infiniteScrollingConfig.increment;

    setTimeout(() => {
      if(callback) callback();
    }, 500);
  }
}
