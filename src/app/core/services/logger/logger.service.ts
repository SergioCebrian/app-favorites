import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DaysConfig } from '@configs/days.config';
import { MonthsConfig } from '@configs/months.config';
import { ILogger } from '@interfaces/logger';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private collectionName: string = 'logs';
  private currentDate: Date = new Date();
  private daysList = DaysConfig;
  private monthsList = MonthsConfig;

  constructor(private db: AngularFirestore) { }

  private save(log: object): Promise<any> {
    return this.db
               .collection(this.collectionName)
               .add(log)
               .then(resp => resp)
               .catch(err => console.error(err));
  }

  register(msg: string): void {
    const currentLogger: ILogger = {
      date: {
        day: {
          name: this.daysList[this.currentDate.getDay()],
          num: this.currentDate.getDay(),
          today: this.currentDate.getDate()
        },
        hours: ('0' + this.currentDate.getHours()).slice(-2),
        minutes: ('0' + this.currentDate.getMinutes()).slice(-2),
        seconds: ('0' + this.currentDate.getSeconds()).slice(-2),
        month: {
          name: this.monthsList[this.currentDate.getMonth()],
          num: this.currentDate.getMonth()
        },
        year: this.currentDate.getFullYear(),
        time: {
          end: this.currentDate.getTime(),
          start: this.currentDate.getTime()
        },
        full: this.currentDate,
        formatted: {
          title: `${ this.daysList[this.currentDate.getDay()] }, ${ this.currentDate.getDate() } ${ this.monthsList[this.currentDate.getMonth()] } ${ this.currentDate.getFullYear() }`,
          url: `${ this.daysList[this.currentDate.getDay()].toLowerCase() }-${ this.currentDate.getDate() }-${ this.monthsList[this.currentDate.getMonth()].toLowerCase() }-${ this.currentDate.getFullYear() }`
        }
      },
      url: {
        pathname: window.location.pathname || '/',
        params: window.location.search || null
      },
      user: {
        name: '',
        message: msg
      }
    }

    this.save(currentLogger);
  }

  getAll(): Observable<any> {
    return this.db
               .collection<any>(this.collectionName)
               .snapshotChanges()
               .pipe(
                 map(actions => actions.map(values => {
                  return {
                    id: values.payload.doc.id,
                    ...values.payload.doc.data()
                  }
                 }))
               );
  }

}
