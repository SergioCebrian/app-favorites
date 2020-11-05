import { CategoriesEffects } from '@modules/categories/store/effects/categories.effects';  
import { FavoritesEffects } from '@modules/favorites/store/effects/favorites.effects'; 
import { LoggerEffects } from '@modules/logger/store/effects/logger.effects';  

export const appEffects: any[] = [ 
    CategoriesEffects,
    FavoritesEffects,
    LoggerEffects
];