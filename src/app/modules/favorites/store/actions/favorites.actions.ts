import { createAction, props } from '@ngrx/store';
import { Types } from '../types/favorites.types';
import { FavoriteModel } from '@models/favorite.model';

const loadFavorites = createAction(
    Types.LOAD
);

const loadFavoritesError = createAction(
    Types.LOAD_ERROR,
    props<{ payload: any }>()
);

const loadFavoritesSuccess = createAction(
    Types.LOAD_SUCCESS,
    props<{ favorites: any }>()
);

const createFavorite = createAction(
    Types.CREATE
);

const createFavoriteError = createAction(
    Types.CREATE_ERROR,
    props<{ payload: any }>()
)

const createFavoriteSuccess = createAction(
    Types.CREATE_SUCCESS,
    props<{ favorite: FavoriteModel[] | any }>()
)

const deleteFavorite = createAction(
    Types.DELETE
);

const deleteFavoriteError = createAction(
    Types.DELETE_ERROR,
    props<{ payload: any }>()
)

const deleteFavoriteSuccess = createAction(
    Types.DELETE_SUCCESS,
    props<{ id: string }>()
)

const updateFavorite = createAction(
    Types.UPDATE
);

const updateFavoriteError = createAction(
    Types.UPDATE_ERROR,
    props<{ payload: any }>()
)

const updateFavoriteSuccess = createAction(
    Types.UPDATE_SUCCESS,
    props<{ favorite: FavoriteModel }>()
)

export { 
    createFavorite,
    createFavoriteError,
    createFavoriteSuccess,
    deleteFavorite,
    deleteFavoriteError,
    deleteFavoriteSuccess,
    loadFavorites,
    loadFavoritesError,
    loadFavoritesSuccess,
    updateFavorite,
    updateFavoriteError,
    updateFavoriteSuccess
}