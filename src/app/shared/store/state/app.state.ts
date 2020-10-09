import { loadingState } from './loading.state';
import { CategoriesState } from './categories.state';
import { FavoritesState } from './favorites.state';

export interface AppState {
    loading: loadingState,
    categories: CategoriesState,
    favorites: FavoritesState
}