import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../model/recipe';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { LoadingService } from '../../services/loading.service';



@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];
  recipe_in_progress: Recipe;
  load_error: boolean;
  error_text: string;
  constructor(private route: Router, private recipeService: RecipeService, private loadingService: LoadingService) {
    this.load_error = false;
}

ngOnInit() {
    this.loadingService.isLoading.next(true);
    this.recipeService.getAllRecipes().then((recipes) => this.recipes = recipes)
                        .catch((err) => {
                            this.load_error = true;
                            const body = JSON.parse(err._body);
                            this.error_text = body.message;
                        });
    this.loadingService.isLoading.next(false);
}

  public addRecipeClicked() {
    console.log(JSON.stringify(this.recipe_in_progress, null, 2));
    this.recipes.unshift(this.recipe_in_progress);
    this.recipe_in_progress = Recipe.createBlank();
  }
  public zoomInOnRecipe(recipe) {
    console.log('Zoom is clicked on:');
    console.log(JSON.stringify(recipe));
  }
  userClickOnRecipe(recipe_id) {
     this.route.navigateByUrl('/recipes/' + recipe_id);
  }


}
