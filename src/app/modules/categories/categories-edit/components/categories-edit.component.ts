import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  @Output()
  OnEditCategory: EventEmitter<any> = new EventEmitter<any>();

  public editCategoryForm: FormGroup;
  public isLoading: boolean = false;

  constructor(private fb: FormBuilder,
              private activatedRouter: ActivatedRoute) { 
  }

  ngOnInit() {
    this.editCategoryForm = this.fb.group({
      id: [this.category.id, Validators.required],
      title: [this.category.title, Validators.required]
    });
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
