import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CategoryService } from '@services/category/category.service';
import { HttpService } from '@http/http.service';

@Component({
  selector: 'app-categories-edit-page',
  templateUrl: './categories-edit.page.html',
  styleUrls: ['./categories-edit.page.scss'],
})
export class CategoriesEditPage implements OnInit {

  public category$: Observable<any>;
  public currentID: string;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.currentID = this.httpService.getParam('id');

    this.categoryService
        .getOne(this.currentID)
        .subscribe(category => this.category$ = category.payload.data());
  }

  async editCategory(event) {
    await this.categoryService.edit(event.category);
    await setTimeout(() => this.router.navigate(['/categories']), 2000);
  }

}
