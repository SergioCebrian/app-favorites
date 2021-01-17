import { FavoriteMock } from '@mocks/favorite.mock';
import { FavoriteModel } from '@models/favorite.model';
import * as FAVORITES_ACTIONS from '../actions/favorites.actions';
import { initialState, favoritesReducer } from './favorites.reducers';

describe('favorites reducers', () => {

    describe('tests default states', () => {

        it('Testing default state', () => {
            const fakeAction = { favorites: [] },
                  fakeState = favoritesReducer(initialState, fakeAction);

            expect(fakeState).toBe(initialState);
        });

    });

    describe('tests load favorites', () => {

        it('Testing load event', () => {
            const fakeAction = FAVORITES_ACTIONS.loadFavorites(),
                  fakeState = favoritesReducer(initialState, fakeAction);

            expect(fakeState).toEqual(initialState);
            expect(fakeState.favorites).toEqual([]);
        });

        it('Testing load success', () => {
            const fakeAction = FAVORITES_ACTIONS.loadFavoritesSuccess({ favorites: FavoriteMock }),
                  fakeState = favoritesReducer(initialState, fakeAction);
                  
            expect(fakeState.favorites).toEqual(FavoriteMock);
            expect(fakeState.favorites.length).toBe(2);
        });

        it('Testing load error', () => {
            const fakeAction = FAVORITES_ACTIONS.loadFavoritesError({ payload: 'error' }),
                  fakeState = favoritesReducer(initialState, fakeAction);

            expect(fakeState.favorites).toEqual([]);
        });

    });

    describe('tests create a favorite', () => {

        it('Testing create a favorite', () => {
            const fakeAction = FAVORITES_ACTIONS.createFavorite(),
                  fakeState = favoritesReducer(initialState, { favorite: [] });

            expect(fakeState.favorites).toEqual([]);
        });

        it('Testing success when create a favorite', () => {
            const fakeAction = FAVORITES_ACTIONS.createFavoriteSuccess({ favorite: FavoriteMock[0] }),
                  fakeState = favoritesReducer(initialState, fakeAction);

            fakeState.favorites.find((favorite: FavoriteModel) => {
                expect(favorite.id).toEqual(FavoriteMock[0].id);
                expect(favorite.title).toEqual(FavoriteMock[0].title);
            });
        });

        it('Testing error when create a favorite', () => {
            const fakeAction = FAVORITES_ACTIONS.createFavoriteError({ payload: 'error' }),
                  fakeState = favoritesReducer(initialState, fakeAction);

            expect(fakeState.favorites).toEqual([]);
        });

    });

    describe('tests remove a favorite', () => {

        it('Testing remove a favorite', () => {
            const fakeAction = FAVORITES_ACTIONS.deleteFavorite(),
                  fakeState = favoritesReducer(initialState, fakeAction);

            expect(fakeState.favorites).toEqual([]);
        });

        it('Testing success remove a favorite', () => {
            const fakeAction = FAVORITES_ACTIONS.deleteFavoriteSuccess({ id: FavoriteMock[0].id }),
                  fakeState = favoritesReducer(initialState, fakeAction);

            fakeState.favorites.filter((favorite: FavoriteModel) => {
                expect(favorite.id !== FavoriteMock[0].id).toBeTrue();
            });
        });

        it('Testing error when remove a favorite', () => {
            const fakeAction = FAVORITES_ACTIONS.deleteFavoriteError({ payload: 'error' }),
                  fakeState = favoritesReducer(initialState, fakeAction);

            expect(fakeState.favorites).toEqual([]);
        });

    });

    describe('tests update a favorite', () => {

        it('Testing update a favorite', () => {
            const fakeAction = FAVORITES_ACTIONS.updateFavorite(),
                  fakeState = favoritesReducer(initialState, fakeAction);

            expect(fakeState.favorites).toEqual([]);
        });

        it('Testing success update a favorite', () => {
            const fakeAction = FAVORITES_ACTIONS.updateFavoriteSuccess({ favorite: FavoriteMock[0] }),
                  fakeState = favoritesReducer(initialState, fakeAction);

            fakeState.favorites.find((favorite: FavoriteModel) => {
                expect(favorite.id).toEqual(FavoriteMock[0].id);
                expect(favorite.title).toEqual(FavoriteMock[0].title);
            });
        });

        it('Testing error when update a favorite', () => {
            const fakeAction = FAVORITES_ACTIONS.updateFavoriteError({ payload: 'error' }),
                  fakeState = favoritesReducer(initialState, fakeAction);

            expect(fakeState.favorites).toEqual([]);
        });

    });

});