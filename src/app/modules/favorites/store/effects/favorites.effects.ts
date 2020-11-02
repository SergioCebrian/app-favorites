import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ACTIONS from '../actions/favorites.actions';
import { FavoriteService } from '@services/favorite/favorite.service';

@Injectable()
export class FavoritesEffects {

    loadFavorites$ = createEffect(
        () => this.actions$.pipe(
                ofType(ACTIONS.loadFavorites),
                mergeMap(
                    () => this.favoriteService.getAll()
                              .pipe(
                                  map( favorites => ACTIONS.loadFavoritesSuccess({ favorites }) ),
                                  catchError( err => of(ACTIONS.loadFavoritesError({ payload: err })) )
                              )
                )
            )
    );

    constructor(
        private actions$: Actions,
        private favoriteService: FavoriteService
    ) {}

}