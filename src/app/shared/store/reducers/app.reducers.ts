import { ActionReducerMap } from '@ngrx/store';
import * as categories from './categories.reducers';
import * as favorites from './favorites.reducers';
import * as loading from './loading.reducers';
import { AppState } from '../state/app.state';

export const appReducers: ActionReducerMap<AppState> = {
    loading: loading.loadingReducer,
    categories: categories.categoriesReducer,
    favorites: favorites.favoritesReducer
}