import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../model/recipe';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { RecipeService } from '../../services/recipe.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  recipe: Recipe;
    load_error: boolean;
    error_text: string;
  constructor(private route: ActivatedRoute,
     private location: Location, private recipeService: RecipeService, private loadingService: LoadingService) {
    this.load_error = false;
   }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
        const recipe_id = parseInt(params.get('recipe_id'), 10);
        this.recipeService.getRecipeById(recipe_id).then(recipe => this.recipe = recipe)
        .catch((err) => {
                this.load_error = true;
                const body = JSON.parse(err._body);
                this.error_text =  body.message;
        });
  });
  }
}
