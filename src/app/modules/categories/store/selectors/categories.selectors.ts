import { createSelector } from '@ngrx/store';
import { AppState } from '@shared/store/state/app.state';
import { CategoriesState } from '../state/categories.state';

const selectCategories = (state: AppState) => state.categories;

const selectCategory = createSelector(
    selectCategories,
    (state: CategoriesState, { slug }) => state.categories.find(category => category.slug === slug)
);

const selectCategoriesAll = createSelector(
    selectCategories,
    (state: CategoriesState) => state.categories
);

const selectCategoriesRange = createSelector(
    selectCategories,
    (state: CategoriesState, { start, end }) => state.categories.slice(start, end)
);

const selectCategoriesCount = createSelector(
    selectCategories,
    (state: CategoriesState) => state.categories.length
);

export {
    selectCategory,
    selectCategories,
    selectCategoriesAll,
    selectCategoriesCount,
    selectCategoriesRange
}