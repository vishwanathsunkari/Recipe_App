export interface Ingredient {
    ingredient: string;
    measure: string;
}

export interface Instruction {
    instruction: string;
    photo: string;
}

export class Recipe {
    constructor(public id: number, public title: string, public description: string, public feeds_this_many: number, public preparation_time: number,
         public ingredients: Ingredient[], public instructions: Instruction[], public cover_photo: string, public keywords: string[], public date_added: Date ) {}


         public static  createBlank() {
            return new Recipe(-1 , '', '', 1, 10, [], [], null, null, null);
        }


        public static recipeFromJSON(obj: any): Recipe {
            return new Recipe(obj.id, obj.title, obj.description, obj.feeds_this_many,
            obj.preparation_time, obj.ingredients, obj.instructions,
        obj.cover_photo, obj.keywords, obj.date_added);
        }
}



