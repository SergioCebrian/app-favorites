import { CategoryModel } from '@models/category.model';

export interface IFavorite {
    title: string,
    description: string,
    url: string,
    slug: string,
    category: CategoryModel,
    category_id: string,
    createdDate: Date,
    lastModifiedDate: Date,
    important: Boolean,
    visits: Number
}