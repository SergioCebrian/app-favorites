import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '@store/state/app.state';
import * as ACTIONS from '@modules/categories/store/actions/categories.actions';

@Component({
  selector: 'app-favorites-create',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './favorites-create.component.html',
  styleUrls: ['./favorites-create.component.scss'],
})
export class FavoritesCreateComponent implements OnInit {

  @Input()
  allCategories: [{ [key: string]: string }];

  @Output()
  OnSaveFavorite: EventEmitter<{ [key: string]: string }> = new EventEmitter<{ [key: string]: string }>();

  // private loadingSubscription: Subscription;
  public categories: [{ [key: string]: string }];
  public createFavoriteForm: FormGroup;
  public isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>
  ) { 
    this.createFavoriteForm = this.fb.group({
      title: ['', [ Validators.minLength(4), Validators.required ]],
      description: ['', [ Validators.minLength(4), Validators.required ]],
      category_id: ['', [ Validators.required ]],
      url: ['', [ Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'), Validators.required ]],
      important: [false, [ ]]
    });
  }

  ngOnInit() {
    /*this.loadingSubscription = this.store
                                   .select('loading')
                                   .subscribe(state => this.isLoading = state.isLoading);*/
  }

  ngOnChanges() {
    if (this.allCategories !== undefined) {
      this.categories = this.allCategories;
    }
  }

  createFavorite() {
    if (this.createFavoriteForm.invalid) { return }
    if (this.createFavoriteForm.valid) {
      const createFavorite = { 
        ...this.createFavoriteForm.value, 
        category: this.allCategories.filter(categories => categories.id === this.createFavoriteForm.value.category_id)[0] 
      }
      this.OnSaveFavorite.emit({ favorite: createFavorite });
      this.createFavoriteForm.reset();
      setTimeout(() => this.isLoading = false, 3000);
    }
  }

  ngOnDestroy() {
    // this.loadingSubscription.unsubscribe();
  }

}