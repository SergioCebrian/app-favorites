import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { UploadService } from '@services/upload/upload.service';

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
  public uploadProgress: Observable<number>;
  public downloadURL: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage
    // private uploadService: UploadService
  ) { }

  ngOnInit() {
    this.editCategoryForm = this.fb.group({
      id: [this.category.id, Validators.required],
      title: [this.category.title, Validators.required],
      description: [this.category.description, Validators.required],
      type: [this.category.type, Validators.required],
      image: [this.category.image, Validators.required]
    });
  }

  updateCategory() {
    if (this.editCategoryForm.invalid) { return }

    if (this.editCategoryForm.valid) {
      this.isLoading = true;
      const categoryImageUpload = document.getElementById('category-image');
      this.editCategoryForm.setValue({ 
        ...this.editCategoryForm.value, 
        image: (categoryImageUpload === null) ? this.editCategoryForm.value.image : categoryImageUpload.getAttribute('src') 
      });
      this.OnEditCategory.emit({ category: this.editCategoryForm.value });
      setTimeout(() => this.isLoading = false, 3000);
    }
  }

  uploadFile(event): void {
    // return this.uploadService.uploadFile(event);
    const file = event.target.files[0],
    fileName = Math.random().toString(36).substring(2),
    filePath = `images/categories/${ fileName }`,
    fileRef = this.storage.ref(filePath),
    task = this.storage.upload(filePath, file);

    this.uploadProgress = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL() )
    )
    .subscribe()
  }

}
