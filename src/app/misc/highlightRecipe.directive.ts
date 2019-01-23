import { Directive, ElementRef, Renderer, Input, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe';

@Directive({
    selector: '[appHighlightrecipe]'
})
export class HighlightRecipeDirective implements OnInit {
    @Input('appHighlightrecipe')
    recipe_to_test: Recipe;

    @Input('appHighlightcolor')
    highlight_color: string;

    constructor(private el: ElementRef, private renderer: Renderer) {
        this.highlight_color = 'grey';
    }


    ngOnInit() {
        const date_added = new Date(this.recipe_to_test.date_added).getTime();
        if (new Date().getTime() - 2 * 86400000 < date_added) {
        this.renderer.setElementStyle(this.el.nativeElement, 'background-color',  this.highlight_color);
    }
}
}

