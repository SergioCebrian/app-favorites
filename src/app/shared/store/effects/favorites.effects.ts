import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import * as ACTIONS from '../actions/favorites.actions';
import { HttpService } from '@http/http.service';
import { of } from 'rxjs';

@Injectable()
export class FavoritesEffects {

    /*loadFavorites$ = createEffect(
        () => this.actions$.pipe(
                ofType(ACTIONS.loadFavorites),
                mergeMap(
                    () => this.httpService.getAll('favorites')
                              .pipe(
                                  map( favorites => ACTIONS.loadFavoritesSuccess({ favorites }) ),
                                  catchError( err => of(ACTIONS.loadFavoritesError({ payload: err })) )
                              )
                )
            )
    );*/

    constructor(
        private actions$: Actions,
        private httpService: HttpService
    ) {}

}