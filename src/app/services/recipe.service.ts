import { Injectable } from '@angular/core';
import { Recipe } from '../model/recipe';
import { Http } from '@angular/http';
import { format } from 'url';

const RECIPE_SERVER = 'http://localhost:8080';

@Injectable()
export class RecipeService {

  constructor(private http: Http) {

}
getAllRecipes(): Promise<Recipe[]> {
 return this.http.get(RECIPE_SERVER + '/v1/recipes.json')
         .toPromise().then(response => response.json().data as Recipe[])
         .catch(this.handleError);
}

getRecipeById(recipe_id: number): Promise<Recipe> {
  return this.http.get(RECIPE_SERVER + `/v1/recipes/${recipe_id}.json`)
                  .toPromise().then(response => response.json().data as Recipe)
                  .catch(this.handleError);
}

// 1.upload the Recipe
// 2.upload the images
// 3.


addRecipe( recipe: Recipe, files: {}): Promise<Recipe> {
  return this.http.put(RECIPE_SERVER + `/v1/recipes.json`, recipe).toPromise()
                  .then((response) => {
                    const final_recipe: Recipe = response.json().data as Recipe;
                    const formData: FormData =  new FormData();

                if (files['cover_photo']) {
                  const file: File = files['cover_photo'];
                  formData.append('cover_photo', file, file.name);
                }

                if (files['instruction_photos']) {
                    for (let i = 0; i < files['instruction_photos'].length; i++) {
                          if (files['instruction_photos']) {
                            const file: File = files['instruction_photos'][i];
                            formData.append('preparation_photos_' + i, file, file.name);
                          }
                    }
                }
                return this.http.post(RECIPE_SERVER + `/v1/recipes/${final_recipe.id}/images`, formData)
                        .toPromise()
                        .then(image_response => final_recipe)
                        .catch(this.handleError);
                  })
                  .catch(this.handleError);
}

private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
}

}
