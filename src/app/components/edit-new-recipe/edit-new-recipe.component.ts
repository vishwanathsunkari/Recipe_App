import { Component, OnInit } from '@angular/core';
import { Recipe, Instruction } from '../../model/recipe';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading.service';
import { RecipeService } from '../../services/recipe.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AbstractControl, ValidatorFn, FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-edit-new-recipe',
  templateUrl: './edit-new-recipe.component.html',
  styleUrls: ['./edit-new-recipe.component.css']
})
export class EditNewRecipeComponent implements OnInit {
  recipe_in_progress: Recipe;
  recipeForm: FormGroup;

  cover_photo_for_viewing = '/assets/empty_bowl.jpg';
  instruction_photo_for_viewing: string[];

  cover_photo_for_upload: File;
  instruction_photo_for_upload: File[];


  constructor(private route: Router, private loadingService: LoadingService, private recipeService: RecipeService) {
    this.recipe_in_progress = Recipe.createBlank();
    this.buildFormGroup();
    this.instruction_photo_for_viewing = [];
    this.instruction_photo_for_upload = [];
  }

  ngOnInit() {
  }
  buildFormGroup() {
    const fg = {
      'title': new FormControl(this.recipe_in_progress.title, [Validators.required]),
      'description': new FormControl(this.recipe_in_progress.description, [Validators.required]),
      'feeds_this_many': new FormControl(this.recipe_in_progress.feeds_this_many, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
      'preparation_time': new FormControl(this.recipe_in_progress.preparation_time, [Validators.required, Validators.minLength(10)])

    };
    for (let i = 0; i < this.recipe_in_progress.ingredients.length; i++ ) {
        fg['ingredient_ ' + i] = new FormControl(this.recipe_in_progress.ingredients[i].ingredient, [Validators.required]),
        fg['measure_' + i] = new FormControl(this.recipe_in_progress.ingredients[i].measure, [Validators.required]);
    }

    for (let i = 0; i < this.recipe_in_progress.instructions.length; i++ ) {
      fg['instruction_' + i] = new FormControl(this.recipe_in_progress.instructions[i].instruction, [Validators.required]);
  }

  this.recipeForm = new FormGroup(fg);
  }



  addIngredientPressed() {
    if (!this.recipe_in_progress.ingredients) {
      this.recipe_in_progress.ingredients = [{ ingredient: null, measure: null }];
    } else {
      this.recipe_in_progress.ingredients.push({ ingredient: null, measure: null });
    }

    this.buildFormGroup();
  }
  removeIngredientAtIndex(index) {
    this.recipe_in_progress.ingredients.splice(index, 1);
    this.buildFormGroup();
  }
  addInstructionPressed() {
    if (!this.recipe_in_progress.instructions) {
      this.recipe_in_progress.instructions = [{ instruction: null, photo: null }];
      this.instruction_photo_for_viewing = [];
      this.instruction_photo_for_upload = [];
    } else {
      this.recipe_in_progress.instructions.push({ instruction: null, photo: null });
      this.instruction_photo_for_viewing.push(null);
      this.instruction_photo_for_upload.push(null);
    }
    this.buildFormGroup();
  }

  removeInstructionsAtIndex(index) {
    this.recipe_in_progress.instructions.splice(index, 1);
    this.instruction_photo_for_viewing.splice(index, 1);
    this.instruction_photo_for_upload.splice(index, 1);
    this.buildFormGroup();
  }

  cancelButtonClicked() {
    this.loadingService.isLoading.next(true);
    this.route.navigate(['/recipes']);
  }

  addRecipeClicked() {
    this.recipeService.addRecipe(this.recipe_in_progress, {
      cover_photo: this.cover_photo_for_upload,
      instruction_photos: this.instruction_photo_for_upload
    })
      .then((recipe) => {
        this.route.navigate(['/recipes', recipe.id]);
      });
  }


  readUrl(event) {
  if (event.target.files && event.target.files[0]) {
    const reader = new FileReader();

    reader.onload = (rdr) => {
      this.cover_photo_for_viewing = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
    this.cover_photo_for_upload = event.target.files[0];
  }
  }


  readInstructionUrl(i: number, event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (rdr) => {
        this.instruction_photo_for_viewing[i] = reader.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.instruction_photo_for_upload[i] = event.target.files[0];
    }
  }
}
