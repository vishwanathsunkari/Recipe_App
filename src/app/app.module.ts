import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import { LoadingModule } from 'ngx-loading';
import { HttpModule} from '@angular/http';


import { AppComponent } from './app.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeSummaryComponent } from './components/recipe-summary/recipe-summary.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { EditNewRecipeComponent } from './components/edit-new-recipe/edit-new-recipe.component';
import { RecipeService } from './services/recipe.service';
import { LoadingService } from './services/loading.service';
import { HighlightRecipeDirective } from './misc/highlightRecipe.directive';


@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeSummaryComponent,
    RecipeDetailsComponent,
    EditNewRecipeComponent,
    HighlightRecipeDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    LoadingModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'editnewrecipe',
        component: EditNewRecipeComponent
      },
      {
        path: 'recipes',
        component: RecipeListComponent
      },
      {
        path: 'recipes/:recipe_id',
        component: RecipeDetailsComponent
      },
      {
        path: '',
        redirectTo: '/recipes',
        pathMatch: 'full'
      }
    ])
  ],
  providers: [RecipeService, LoadingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
