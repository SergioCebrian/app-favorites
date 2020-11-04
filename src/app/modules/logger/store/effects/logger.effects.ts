import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as ACTIONS from '../actions/logger.actions';
import { LoggerService } from '@services/logger/logger.service';

@Injectable()
export class CategoriesEffects {

    loadLogger$ = createEffect(
        () => this.actions$.pipe(
                ofType(ACTIONS.loadLogger),
                mergeMap(
                    () => this.loggerService
                              .getAll()
                              .pipe(
                                map(logger => ACTIONS.loadLoggerSuccess({ logger })),
                                catchError( err => of(ACTIONS.loadLoggerError({ payload: err })) )
                              )
                )
            )
    );

    constructor(
        private actions$: Actions,
        private loggerService: LoggerService
    ) {}

}