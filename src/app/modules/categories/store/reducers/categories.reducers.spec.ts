import { CategoryMock } from '@mocks/category.mock';
import { CategoryModel } from '@models/category.model';
import * as CATEGORIES_ACTIONS from '../actions/categories.actions';
import { initialState, categoriesReducer } from './categories.reducers';

describe('categories reducers', () => {

    describe('tests default states', () => {

        it('Testing default state', () => {
            const fakeAction = { categories: [] },
                  fakeState = categoriesReducer(initialState, fakeAction);

            expect(fakeState).toBe(initialState);
        });

    });

    describe('tests load categories', () => {

        it('Testing load event', () => {
            const fakeAction = CATEGORIES_ACTIONS.loadCategories(),
                  fakeState = categoriesReducer(initialState, fakeAction);

            expect(fakeState).toEqual(initialState);
            expect(fakeState.categories).toEqual([]);
        });

        it('Testing load success', () => {
            const fakeAction = CATEGORIES_ACTIONS.loadCategoriesSuccess({ categories: CategoryMock }),
                  fakeState = categoriesReducer(initialState, fakeAction);
                  
            expect(fakeState.categories).toEqual(CategoryMock);
            expect(fakeState.categories.length).toBe(2);
        });

        it('Testing load error', () => {
            const fakeAction = CATEGORIES_ACTIONS.loadCategoriesError({ payload: 'error' }),
                  fakeState = categoriesReducer(initialState, fakeAction);

            expect(fakeState.categories).toEqual([]);
        });

    });

    describe('tests create a category', () => {

        it('Testing create a category', () => {
            const fakeAction = CATEGORIES_ACTIONS.createCategory(),
                  fakeState = categoriesReducer(initialState, { category: [] });

            expect(fakeState.categories).toEqual([]);
        });

        it('Testing success when create a category', () => {
            const fakeAction = CATEGORIES_ACTIONS.createCategorySuccess({ category: CategoryMock[0] }),
                  fakeState = categoriesReducer(initialState, fakeAction);

            fakeState.categories.find((category: CategoryModel) => {
                expect(category.id).toEqual(CategoryMock[0].id);
                expect(category.title).toEqual(CategoryMock[0].title);
            });
        });

        it('Testing error when create a category', () => {
            const fakeAction = CATEGORIES_ACTIONS.createCategoryError({ payload: 'error' }),
                  fakeState = categoriesReducer(initialState, fakeAction);

            expect(fakeState.categories).toEqual([]);
        });

    });

    describe('tests remove a category', () => {

        it('Testing remove a category', () => {
            const fakeAction = CATEGORIES_ACTIONS.deleteCategory(),
                  fakeState = categoriesReducer(initialState, fakeAction);

            expect(fakeState.categories).toEqual([]);
        });

        it('Testing success remove a category', () => {
            const fakeAction = CATEGORIES_ACTIONS.deleteCategorySuccess({ id: CategoryMock[0].id }),
                  fakeState = categoriesReducer(initialState, fakeAction);

            fakeState.categories.filter((category: CategoryModel) => {
                expect(category.id !== CategoryMock[0].id).toBeTrue();
            });
        });

        it('Testing error when remove a category', () => {
            const fakeAction = CATEGORIES_ACTIONS.deleteCategoryError({ payload: 'error' }),
                  fakeState = categoriesReducer(initialState, fakeAction);

            expect(fakeState.categories).toEqual([]);
        });

    });

    describe('tests update a category', () => {

        it('Testing update a category', () => {
            const fakeAction = CATEGORIES_ACTIONS.updateCategory(),
                  fakeState = categoriesReducer(initialState, fakeAction);

            expect(fakeState.categories).toEqual([]);
        });

        it('Testing success update a category', () => {
            const fakeAction = CATEGORIES_ACTIONS.updateCategorySuccess({ category: CategoryMock[0] }),
                  fakeState = categoriesReducer(initialState, fakeAction);

            fakeState.categories.find((category: CategoryModel) => {
                expect(category.id).toEqual(CategoryMock[0].id);
                expect(category.title).toEqual(CategoryMock[0].title);
            });
        });

        it('Testing error when update a category', () => {
            const fakeAction = CATEGORIES_ACTIONS.updateCategoryError({ payload: 'error' }),
                  fakeState = categoriesReducer(initialState, fakeAction);

            expect(fakeState.categories).toEqual([]);
        });

    });

});