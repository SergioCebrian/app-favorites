import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
  favorite: { [key: string]: string };

  @Output()
  OnEditFavorite: EventEmitter<any> = new EventEmitter<any>();

  public categories: [{ [key: string]: string }];
  public editFavoriteForm: FormGroup;
  public isLoading: boolean = false;

  constructor(private fb: FormBuilder,
              private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.categories = this.allCategories;

    this.editFavoriteForm = this.fb.group({
      id: [this.favorite.id, Validators.required],
      title: [this.favorite.title, Validators.required],
      description: [this.favorite.description, [ Validators.minLength(4), Validators.required ]],
      category: [this.favorite.category_id, [ Validators.required ]],
      url: [this.favorite.url, [ Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'), Validators.required ]],
      important: [this.favorite.important, [ ]]
    });
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
