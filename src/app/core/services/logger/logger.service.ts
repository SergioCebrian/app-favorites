import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DaysConfig } from '@configs/days.config';
import { MonthsConfig } from '@configs/months.config';
import { map } from 'rxjs/operators';

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

  register(msg: string) {
    const currentLogger = {
      date: {
        day: {
          name: this.daysList[this.currentDate.getDay()],
          num: this.currentDate.getDay(),
          today: this.currentDate.getDate()
        },
        hours: this.currentDate.getHours(),
        minutes: this.currentDate.getMinutes(),
        seconds: this.currentDate.getSeconds(),
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
        formatted: `${ this.daysList[this.currentDate.getDay()] }, ${ this.currentDate.getDate() } ${ this.monthsList[this.currentDate.getMonth()] } ${ this.currentDate.getFullYear() }`
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
