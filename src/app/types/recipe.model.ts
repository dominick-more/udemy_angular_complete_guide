import Ingredient from './ingredient.model';
import { WithOptional } from './type-script';

type Recipe = {
    id: string;
    name: string;
    description: string;
    imagePath: string;
    ingredients: Readonly<WithOptional<Ingredient, 'id'>>[];
}

export default Recipe;