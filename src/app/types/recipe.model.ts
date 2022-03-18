import Ingredient from './ingredient.model';

type Recipe = {
    id: string;
    name: string;
    description: string;
    imagePath: string;
    ingredients: Readonly<Ingredient>[];
}

export default Recipe;