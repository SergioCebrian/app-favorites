import { selectCategoriesAll, selectCategoriesCount, selectCategoriesRange, selectCategory } from './categories.selectors';
import { CategoryMock } from '@mocks/category.mock';

describe('tests Categories selectors', () => {
    
    const initialState = {
        categories: CategoryMock
    };

    it('Testing return all categories', () => {
        const result = selectCategoriesAll.projector(initialState);
        expect(result[1].id).toBe('2');
        expect(result.length).toEqual(2);
    });

    it('Testing count the categories', () => {
        expect(selectCategoriesCount.projector(initialState)).toBe(2);
    });

    it('Testing select one category', () => {
        const result = selectCategory.projector(initialState, { slug: 'slug-2' });
        expect(result.id).toBe('2');
    });

    it('Testing range 1-2 categories', () => {
        const result = selectCategoriesRange.projector(initialState, { start: 0, end: 2 });
        expect(result[0].id).toBe('1');
        expect(result[1].id).toBe('2');
        expect(result.length).toEqual(2);
    });

});