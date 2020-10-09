import { createAction, props } from '@ngrx/store';
import * as CONSTANTS from '../constants/categories.constants';
import { CategoryModel } from '@models/category.model';

const loadCategories = createAction(
    CONSTANTS.LOAD_CATEGORIES
);

const loadCategoriesError = createAction(
    CONSTANTS.LOAD_CATEGORIES_ERROR,
    props<{ payload: any }>()
);

const loadCategoriesSuccess = createAction(
    CONSTANTS.LOAD_CATEGORIES_SUCCESS,
    props<{ categories: CategoryModel[] | any }>()
);

const createCategory = createAction(
    CONSTANTS.CREATE_CATEGORY
);

const createCategoryError = createAction(
    CONSTANTS.CREATE_CATEGORY_ERROR,
    props<{ payload: any }>()
)

const createCategorySuccess = createAction(
    CONSTANTS.CREATE_CATEGORY_SUCCESS,
    props<{ category: CategoryModel[] }>()
)

const deleteCategory = createAction(
    CONSTANTS.DELETE_CATEGORY
);

const deleteCategoryError = createAction(
    CONSTANTS.DELETE_CATEGORY_ERROR,
    props<{ payload: any }>()
)

const deleteCategorySuccess = createAction(
    CONSTANTS.DELETE_CATEGORY_SUCCESS,
    props<{ category: CategoryModel | any }>()
)

const updateCategory = createAction(
    CONSTANTS.UPDATE_CATEGORY
);

const updateCategoryError = createAction(
    CONSTANTS.UPDATE_CATEGORY_ERROR,
    props<{ payload: any }>()
)

const updateCategorySuccess = createAction(
    CONSTANTS.UPDATE_CATEGORY_SUCCESS,
    props<{ category: CategoryModel }>()
)

export { 
    createCategory,
    createCategoryError,
    createCategorySuccess,
    deleteCategory,
    deleteCategoryError,
    deleteCategorySuccess,
    loadCategories,
    loadCategoriesError,
    loadCategoriesSuccess,
    updateCategory,
    updateCategoryError,
    updateCategorySuccess
}