import { createSelector } from '@ngrx/store';
import { AppState } from '@shared/store/state/app.state';
import { FavoritesState } from '../state/favorites.state';

// TODO: Revisar los selectores del total de 'History' y 'Likes'.

const selectFavorites = (state: AppState) => state.favorites;

const selectFavorite = createSelector(
    selectFavorites,
    (state: FavoritesState, { slug }) => state.favorites.find(favorite => favorite.slug === slug)
);

const selectFavoritesAll = createSelector(
    selectFavorites,
    (state: FavoritesState) => state.favorites
);

const selectFavoritesByCategory = createSelector(
    selectFavorites,
    (state: FavoritesState, props) => state.favorites.filter(favorite => favorite.category.slug === props.category)
);

const selectFavoritesCount = createSelector(
    selectFavorites,
    (state: FavoritesState) => state.favorites.length
);

const selectFavoritesHistory = createSelector(
    selectFavorites,
    (state: FavoritesState, props) => state.favorites.filter(favorite => favorite.visits >= props.min )
                                                     .sort((a, b) => (a.visits < b.visits) ? 1 : (a.visits === b.visits) ? ((a.lastModifiedDate < b.lastModifiedDate) ? 1 : -1) : -1 )
);

const selectFavoritesHistoryCount = createSelector(
    selectFavorites,
    selectFavoritesHistory,
    (state: FavoritesState) => state.favorites.length
);

const selectFavoritesLikes = createSelector(
    selectFavorites,
    (state: FavoritesState) => state.favorites.filter(like => like.important === true)
);

const selectFavoritesLikesCount = createSelector(
    selectFavorites,
    selectFavoritesLikes,
    (state: FavoritesState) => state.favorites.length
);

const selectFavoritesLimit = createSelector(
    selectFavorites,
    (state: FavoritesState, { start, end }) => state.favorites.slice(start, end)
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
    selectFavoritesLikesCount,
    selectFavoritesLimit
}