import { CategoryModel } from './category.model';

export interface FavoriteModel {
    id: string,
    title: string,
    description: string,
    url: string,
    slug: string,
    category: CategoryModel,
    category_id: string,
    lastModifiedDate: Date,
    important: Boolean,
    visits: Number
}