import { ActionReducerMap } from '@ngrx/store';
import * as categories from '@modules/categories/store/reducers/categories.reducers';
import * as favorites from '@modules/favorites/store/reducers/favorites.reducers';
import * as logger from '@modules/logger/store/reducers/logger.reducers';
import * as loading from './loading.reducers';
import { AppState } from '../state/app.state';
import { loggerReducer } from '@modules/logger/store/reducers/logger.reducers';

export const appReducers: ActionReducerMap<AppState> = {
  loading: loading.loadingReducer,
  categories: categories.categoriesReducer,
  favorites: favorites.favoritesReducer,
  logger: logger.loggerReducer
}