import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@store/state/app.state';
import { UploadService } from '@services/upload/upload.service';

@Component({
  selector: 'app-categories-create',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    private store: Store<AppState>,
    private uploadService: UploadService 
  ) { 
    this.createCategoryForm = this.fb.group({
      title: ['', [ Validators.minLength(3), Validators.required ]],
      description: ['', [ Validators.minLength(3), Validators.required ]],
      type: ['', [ Validators.minLength(3), Validators.required ]],
      image: ['', [ Validators.required ]]
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
      this.createCategoryForm.setValue({ 
        ...this.createCategoryForm.value, 
        image: document.getElementById('category-image').getAttribute('src') 
      });
      this.categoryNewValues.emit({ categoryData: this.createCategoryForm.value });
      this.createCategoryForm.reset();
      setTimeout(() => this.isLoading = false, 3000);
    }
  }

  uploadFile(event): void {
    this.uploadService.uploadFile(event);
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}
