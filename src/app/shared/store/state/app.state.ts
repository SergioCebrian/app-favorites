import { loadingState } from './loading.state';
import { CategoriesState } from '@modules/categories/store/state/categories.state';
import { FavoritesState } from '@modules/favorites/store/state/favorites.state';
import { LoggerState } from '@modules/logger/store/state/logger.state';

export interface AppState {
    loading: loadingState,
    categories: CategoriesState,
    favorites: FavoritesState,
    logger: LoggerState
}