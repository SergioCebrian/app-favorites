import { Component, Input, OnInit, OnChanges, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { updateCategory } from '@modules/categories/store/actions/categories.actions';

@Component({
  selector: 'app-favorites-edit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './favorites-edit.component.html',
  styleUrls: ['./favorites-edit.component.scss'],
})
export class FavoritesEditComponent implements OnInit {

  @Input()
  allCategories: [{ [key: string]: string }];

  @Input()
  favoriteID: string;

  @Input()
  favorite: { [key: string]: string };

  @Output()
  OnEditFavorite: EventEmitter<any> = new EventEmitter<any>();

  public categories: [{ [key: string]: string }];
  public editFavoriteForm: FormGroup;
  public isLoading: boolean = false;

  constructor(private fb: FormBuilder,
              private activatedRouter: ActivatedRoute) { 
  }

  ngOnInit() {
    this.editFavoriteForm = this.fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', [ Validators.minLength(4), Validators.required ]],
      category: ['', [ Validators.required ]],
      url: ['', [ Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'), Validators.required ]],
      important: ['', [ ]]
    });
  }

  ngOnChanges() {
    if (this.allCategories !== undefined && this.favorite !== undefined) {
      this.categories = this.allCategories;
      this.editFavoriteForm.controls['id'].setValue(this.favoriteID);
      this.editFavoriteForm.controls['title'].setValue(this.favorite.title);
      this.editFavoriteForm.controls['description'].setValue(this.favorite.description);
      this.editFavoriteForm.controls['category'].setValue(this.favorite.category_id);
      this.editFavoriteForm.controls['url'].setValue(this.favorite.url);
      this.editFavoriteForm.controls['important'].setValue(this.favorite.important);
    }
  }

  updateFavorite() {
    if (this.editFavoriteForm.invalid) { return }

    if (this.editFavoriteForm.valid) {
      this.isLoading = true;
      const updateFavorite = { 
        id: this.editFavoriteForm.value.id,
        title: this.editFavoriteForm.value.title,
        description: this.editFavoriteForm.value.description,
        category: this.allCategories.filter(categories => categories.id === this.editFavoriteForm.value.category)[0],
        category_id: this.editFavoriteForm.value.category,
        url: this.editFavoriteForm.value.url,
        important: this.editFavoriteForm.value.important
      }
      this.OnEditFavorite.emit({ favorite: updateFavorite });
      setTimeout(() => this.isLoading = false, 3000);
    }
  }

}