import { Component, Input, OnInit, OnChanges, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories-edit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.scss'],
})
export class CategoriesEditComponent implements OnInit {

  @Input()
  category: { [key: string]: string };

  @Input()
  categoryID: string;

  @Output()
  OnEditCategory: EventEmitter<any> = new EventEmitter<any>();

  public editCategoryForm: FormGroup;
  public isLoading: boolean = false;

  constructor(private fb: FormBuilder,
              private activatedRouter: ActivatedRoute) { 
  }

  ngOnInit() {
    this.editCategoryForm = this.fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required]
    });
  }

  ngOnChanges() {
      if (this.category !== undefined) {
        this.editCategoryForm.controls['id'].setValue(this.categoryID);
        this.editCategoryForm.controls['title'].setValue(this.category.title);
      }
  }

  updateCategory() {
    if (this.editCategoryForm.invalid) { return }

    if (this.editCategoryForm.valid) {
      this.isLoading = true;
      const updateCategory = { 
        id: this.editCategoryForm.value.id,
        title: this.editCategoryForm.value.title,
      }
      this.OnEditCategory.emit({ category: updateCategory });
      setTimeout(() => this.isLoading = false, 3000);
    }
  }

}
