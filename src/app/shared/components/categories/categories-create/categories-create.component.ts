import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '@store/state/app.state';
import * as ACTIONS from '@store/actions/categories.actions';

@Component({
  selector: 'app-categories-create',
  templateUrl: './categories-create.component.html',
  styleUrls: ['./categories-create.component.scss'],
})
export class CategoriesCreateComponent implements OnInit, OnDestroy {

  @Output()
  categoryNewValues: EventEmitter<{ [key: string]: string }> = new EventEmitter<{ [key: string]: string }>();

  private loadingSubscription: Subscription;
  public createCategoryForm: FormGroup;
  public isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>
  ) { 
    this.createCategoryForm = this.fb.group({
      title: ['', [ Validators.minLength(3), Validators.required ]],
    });
  }

  ngOnInit() {
    this.loadingSubscription = this.store
                                   .select('loading')
                                   .subscribe(state => this.isLoading = state.isLoading);
  }

  createCategory() {
    if (this.createCategoryForm.invalid) { return }
    if (this.createCategoryForm.valid) {
      this.categoryNewValues.emit({ categoryData: this.createCategoryForm.value })
    }
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}
