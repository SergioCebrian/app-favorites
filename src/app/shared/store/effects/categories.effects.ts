import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ACTIONS from '@store/actions/categories.actions';

import { CategoryService } from '@services/category/category.service';

@Injectable()
export class CategoriesEffects {

    /*loadCategories$ = createEffect(
        () => this.actions$.pipe(
                ofType(ACTIONS.loadCategories),
                mergeMap(
                    () => this.categoryService.getAll()
                              .pipe(
                                  map( categories => ACTIONS.loadCategoriesSuccess({ categories }) ), // categories: categories
                                  catchError( err => of(ACTIONS.loadCategoriesError({ payload: err })) )
                              )
                )
            )
    );*/

    constructor(
        private actions$: Actions,
        private categoryService: CategoryService
    ) {}

}