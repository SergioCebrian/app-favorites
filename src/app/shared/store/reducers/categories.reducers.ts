import { createReducer, on } from '@ngrx/store';
import * as ACTIONS from '../actions/categories.actions';
import { CategoriesState } from '../state/categories.state';

export const initialState: CategoriesState = {
    categories: []
}

const _categoriesReducer = createReducer(
    initialState,
    on(ACTIONS.loadCategories, state => ({ ...state })),
    on(ACTIONS.loadCategoriesError, (state, { payload }) => ({ ...state })),
    on(ACTIONS.loadCategoriesSuccess, (state, { categories }) => ({ ...state, categories: [ ...categories ] })),
    on(ACTIONS.createCategory, state => ({ ...state })),
    on(ACTIONS.createCategoryError, (state, { payload }) => ({ ...state })),
    on(ACTIONS.createCategorySuccess, (state, { category }) => ({ ...state, categories: [ state.categories, category ] })),
    on(ACTIONS.deleteCategory, (state) => ({ ...state })),
    on(ACTIONS.deleteCategoryError, (state, { payload }) => ({ ...state })),
    on(ACTIONS.deleteCategorySuccess, (state, { category }) => {
        return {
            ...state,
            categories: state.categories.filter(cat => cat.id !== category.id)
        }
    }),
    on(ACTIONS.updateCategory, (state) => ({ ...state })),
    on(ACTIONS.updateCategoryError, (state, { payload }) => ({ ...state })),
    on(ACTIONS.updateCategorySuccess, (state, { category }) => {
        return {
            ...state,
            categories: state.categories.map(cat => {  
                return (cat.id === category.id)
                    ? { ...cat, ...category }
                    : cat;  
            })
        }
    })
);

export function categoriesReducer(state, action) {
    return _categoriesReducer(state, action);
}