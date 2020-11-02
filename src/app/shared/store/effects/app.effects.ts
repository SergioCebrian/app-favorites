import { CategoriesEffects } from '@modules/categories/store/effects/categories.effects';  
import { FavoritesEffects } from '@modules/favorites/store/effects/favorites.effects';  

export const appEffects: any[] = [ 
    CategoriesEffects,
    FavoritesEffects
];