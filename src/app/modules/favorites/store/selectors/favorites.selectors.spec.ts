import { CategoryMock } from '@mocks/category.mock';
import { FavoriteMock } from '@mocks/favorite.mock';
import { CategoryModel } from '@models/category.model';
import * as FAVORITES_SELECTORS from './favorites.selectors';

describe('tests Favorites selectors', () => {

    const fakeInitialState = {
      favorites: FavoriteMock
    };

    it('Testing return all favorites', () => {
        const result = FAVORITES_SELECTORS.selectFavoritesAll.projector(fakeInitialState, { start: 0, end: 2 });
        expect(result[0].id).toBe('1');
        expect(result[1].id).toBe('2');
        expect(result.length).toEqual(2);
    });

    it('Testing count favorites', () => {
        expect(FAVORITES_SELECTORS.selectFavoritesCount.projector(fakeInitialState)).toEqual(2);
    });

    it('Testing one category', () => {
        const result = FAVORITES_SELECTORS.selectFavorite.projector(fakeInitialState, { slug: 'slug-2' });
        expect(result.id).toBe('2');
    });

    it('Testing search a category', () => {
        const result = FAVORITES_SELECTORS.selectFavoritesSearch.projector(fakeInitialState, { min: 3, start: 0, end: 1, term: 'Title 2' });
        expect(result[0].title).toBe('Title 2');
    });

    it('Testing favorites with category "2"', () => {
        const expectedCategories: CategoryModel[] = CategoryMock,
              result = FAVORITES_SELECTORS.selectFavoritesByCategory.projector(fakeInitialState, { category: expectedCategories[1].slug, start: 0, end: 5 });

        expect(result).toEqual(jasmine.any(Array));
        expect(result).toEqual([fakeInitialState.favorites[1]]);        
        expect(result.length).toEqual(1);
    });

    it('Testing count favorites with category "2"', () => {
        const expectedCategories: CategoryModel[] = CategoryMock,
              result = FAVORITES_SELECTORS.selectFavoritesByCategoryCount.projector(fakeInitialState, { category: expectedCategories[1].slug });
        expect(result).toEqual(1); 
    });

    it('Testing favorites with visits more than one', () => {
        const result = FAVORITES_SELECTORS.selectFavoritesHistory.projector(fakeInitialState, { min: 3, start: 0, end: 5 });

        expect(result).toEqual(jasmine.any(Array));
        expect(result.length).toEqual(2);
    });

    it('Testing favorites history count', () => {
        const result = FAVORITES_SELECTORS.selectFavoritesHistoryCount.projector(fakeInitialState, { min: 3 });
        expect(result).toEqual(2);
    });

    it('Testing favorites with like property checked', () => {
        const result = FAVORITES_SELECTORS.selectFavoritesLikes.projector(fakeInitialState, { start: 0, end: 5 });

        expect(result).toEqual(jasmine.any(Array));
        expect(result).toEqual([fakeInitialState.favorites[0]]);
        expect(result.length).toEqual(1);
    });

    it('Testing count favorites with like property checked', () => {
        const result = FAVORITES_SELECTORS.selectFavoritesLikesCount.projector(fakeInitialState);
        expect(result).toEqual(1);
    });

});
