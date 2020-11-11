import { createReducer, on } from '@ngrx/store';
import * as ACTIONS from '../actions/favorites.actions';
import { FavoritesState } from '../state/favorites.state';

export const initialState: FavoritesState = {
    favorites: []
}

const _favoritesReducer = createReducer(
    initialState,
    on(ACTIONS.loadFavorites, state => ({ ...state })),
    on(ACTIONS.loadFavoritesError, (state, { payload }) => ({ ...state })),
    on(ACTIONS.loadFavoritesSuccess, (state, { favorites }) => ({ ...state, favorites: [ ...favorites ] })),
    on(ACTIONS.createFavorite, state => ({ ...state })),
    on(ACTIONS.createFavoriteError, (state, { payload }) => ({ ...state })),
    on(ACTIONS.createFavoriteSuccess, (state, { favorite }) => ({ ...state, favorites: [ ...state.favorites, favorite ] })),
    on(ACTIONS.deleteFavorite, (state) => ({ ...state })),
    on(ACTIONS.deleteFavoriteError, (state, { payload }) => ({ ...state })),
    on(ACTIONS.deleteFavoriteSuccess, (state, { id }) => {
        return {
            ...state,
            favorites: state.favorites.filter(cat => cat.id !== id)
        }
    }),
    on(ACTIONS.updateFavorite, (state) => ({ ...state })),
    on(ACTIONS.updateFavoriteError, (state, { payload }) => ({ ...state })),
    on(ACTIONS.updateFavoriteSuccess, (state, { favorite }) => {
        return {
            ...state,
            favorites: state.favorites.map(cat => {  
                return (cat.id === favorite.id)
                    ? { ...cat, ...favorite }
                    : cat;  
            })
        }
    })
);

export function favoritesReducer(state, action) {
    return _favoritesReducer(state, action);
}