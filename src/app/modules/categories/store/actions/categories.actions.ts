import { createAction, props } from '@ngrx/store';
import { Types } from '../types/categories.types';
import { CategoryModel } from '@models/category.model';

const loadCategories = createAction(
    Types.LOAD
);

const loadCategoriesError = createAction(
    Types.LOAD_ERROR,
    props<{ payload: any }>()
);

const loadCategoriesSuccess = createAction(
    Types.LOAD_SUCCESS,
    props<{ categories: any }>()
);

const createCategory = createAction(
    Types.CREATE
);

const createCategoryError = createAction(
    Types.CREATE_ERROR,
    props<{ payload: any }>()
)

const createCategorySuccess = createAction(
    Types.CREATE_SUCCESS,
    props<{ category: any }>()
)

const deleteCategory = createAction(
    Types.DELETE
);

const deleteCategoryError = createAction(
    Types.DELETE_ERROR,
    props<{ payload: any }>()
)

const deleteCategorySuccess = createAction(
    Types.DELETE_SUCCESS,
    props<{ id: string }>()
)

const updateCategory = createAction(
    Types.UPDATE
);

const updateCategoryError = createAction(
    Types.UPDATE_ERROR,
    props<{ payload: any }>()
)

const updateCategorySuccess = createAction(
    Types.UPDATE_SUCCESS,
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