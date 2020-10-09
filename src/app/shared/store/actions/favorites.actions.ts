import { createAction, props } from '@ngrx/store';
import * as CONSTANTS from '../constants/favorites.constants';
import { FavoriteModel } from '@models/favorite.model';

const loadFavorites = createAction(
    CONSTANTS.LOAD_FAVORITES
);

const loadFavoritesError = createAction(
    CONSTANTS.LOAD_FAVORITES_ERROR,
    props<{ payload: any }>()
);

const loadFavoritesSuccess = createAction(
    CONSTANTS.LOAD_FAVORITES_SUCCESS,
    props<{ favorites: FavoriteModel[] | any }>()
);

const createFavorite = createAction(
    CONSTANTS.CREATE_FAVORITE
);

const createFavoriteError = createAction(
    CONSTANTS.CREATE_FAVORITE_ERROR,
    props<{ payload: any }>()
)

const createFavoriteSuccess = createAction(
    CONSTANTS.CREATE_FAVORITE_SUCCESS,
    props<{ favorite: FavoriteModel[] | any }>()
)

const deleteFavorite = createAction(
    CONSTANTS.DELETE_FAVORITE
);

const deleteFavoriteError = createAction(
    CONSTANTS.DELETE_FAVORITE_ERROR,
    props<{ payload: any }>()
)

const deleteFavoriteSuccess = createAction(
    CONSTANTS.DELETE_FAVORITE_SUCCESS,
    props<{ favorite: FavoriteModel | any }>()
)

const updateFavorite = createAction(
    CONSTANTS.UPDATE_FAVORITE
);

const updateFavoriteError = createAction(
    CONSTANTS.UPDATE_FAVORITE_ERROR,
    props<{ payload: any }>()
)

const updateFavoriteSuccess = createAction(
    CONSTANTS.UPDATE_FAVORITE_SUCCESS,
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