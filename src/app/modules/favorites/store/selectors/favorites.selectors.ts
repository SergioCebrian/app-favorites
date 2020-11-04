import { createSelector } from '@ngrx/store';
import { AppState } from '@shared/store/state/app.state';
import { FavoritesState } from '../state/favorites.state';

const selectFavorites = (state: AppState) => state.favorites;

const selectFavorite = createSelector(
    selectFavorites,
    (state: FavoritesState, { slug }) => state.favorites.find(favorite => favorite.slug === slug)
);

const selectFavoritesAll = createSelector(
    selectFavorites,
    (state: FavoritesState, { start, end }) => state.favorites.slice(start, end)
);

const selectFavoritesByCategory = createSelector(
    selectFavorites,
    (state: FavoritesState, { category }) => state.favorites.filter(favorite => favorite.category.slug === category)
);

const selectFavoritesCount = createSelector(
    selectFavorites,
    (state: FavoritesState) => state.favorites.length
);

const selectFavoritesHistory = createSelector(
    selectFavorites,
    (state: FavoritesState, { min, start, end }) => state.favorites
                                                         .filter(favorite => favorite.visits >= min )
                                                         .sort((a, b) => (a.visits < b.visits) ? 1 : (a.visits === b.visits) ? ((a.lastModifiedDate < b.lastModifiedDate) ? 1 : -1) : -1 )
                                                         .slice(start, end)
);

const selectFavoritesHistoryCount = createSelector(
    selectFavorites,
    (state: FavoritesState, { min }) => state.favorites.filter(favorite => favorite.visits >= min).length                                                        
);

const selectFavoritesLikes = createSelector(
    selectFavorites,
    (state: FavoritesState, { start, end }) => state.favorites.filter(like => like.important === true).slice(start, end)
);

const selectFavoritesLikesCount = createSelector(
    selectFavorites,
    (state: FavoritesState) => state.favorites.filter(like => like.important === true).length
);

export {
    selectFavorite,
    selectFavorites,
    selectFavoritesAll,
    selectFavoritesByCategory,
    selectFavoritesCount,
    selectFavoritesHistory,
    selectFavoritesHistoryCount,
    selectFavoritesLikes,
    selectFavoritesLikesCount
}