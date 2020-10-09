import { Component, OnInit } from '@angular/core';
import { CategoryService } from '@services/category/category.service';

@Component({
  selector: 'app-categories-create-page',
  templateUrl: './categories-create.page.html',
  styleUrls: ['./categories-create.page.scss'],
})
export class CategoriesCreatePage implements OnInit {

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() { }

  saveCategory(event: any): void {
    this.categoryService
        .save(event.categoryData)
        .then(resp => resp)
        .catch(err => console.error(err));
  }

}
