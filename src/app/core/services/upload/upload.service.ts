import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private uploadProgress: Observable<number>;
  private downloadURL: Observable<string>;

  constructor(
    private storage: AngularFireStorage
  ) { }

  uploadFile(event): void {
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

  getDownloadUrl(): Observable<string> {
    return this.downloadURL;
  }

  getUploadProgress(): Observable<number> {
    return this.uploadProgress;
  }

}
