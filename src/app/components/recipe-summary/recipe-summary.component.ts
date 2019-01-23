import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../model/recipe';

@Component({
  selector: 'app-recipe-summary',
  templateUrl: './recipe-summary.component.html',
  styleUrls: ['./recipe-summary.component.css']
})
export class RecipeSummaryComponent implements OnInit {
  @Input()
  recipe: Recipe;
  @Output()
  zoomIn: EventEmitter<Recipe> = new EventEmitter();

  @Output() userClick: EventEmitter<number> =  new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public zoomInClicked() {
    this.zoomIn.emit(this.recipe);
  }

  userClicked() {
    this.userClick.emit(this.recipe.id);
  }
}
