import { Injectable, ViewChild } from '@angular/core';
import { IInfiniteScroll } from '@interfaces/infinite-scroll';
import { IonInfiniteScroll } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InfiniteScrollService {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;


  public infiniteScrollConfigOrig: IInfiniteScroll = {
    start: 0,
    end: 10,
    increment: 10
  }

  public infiniteScrollConfig: IInfiniteScroll = this.infiniteScrollConfigOrig;

  constructor() { }

  incrementRangeData(): IInfiniteScroll {
    return this.infiniteScrollConfig = {
      start:  this.infiniteScrollConfig.start += this.infiniteScrollConfig.increment,
      end: this.infiniteScrollConfig.end += this.infiniteScrollConfig.increment,
      increment: this.infiniteScrollConfig.increment
    }
  }

  setInfiniteScrollParams(params): IInfiniteScroll {
    return this.infiniteScrollConfig = {
      start: params.start || this.infiniteScrollConfig.start,
      end: params.end || this.infiniteScrollConfig.end,
      increment: params.increment || this.infiniteScrollConfig.increment,
    }
  }

  loadData(callback: any): any {
    callback;
  }

  resetConfig(): void {
    this.infiniteScrollConfig = this.infiniteScrollConfigOrig;
    console.log(this.infiniteScrollConfig);
  }

}
