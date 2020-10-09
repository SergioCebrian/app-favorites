import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '@store/state/app.state';
import * as loadingActions from '@store/actions/loading.actions';

import { Category } from '@interfaces/category';
import { CategoryModel } from '@models/category.model';
import { SlugService } from '@helpers/slug/slug.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private collectionName: string = 'categories';

  constructor(
    private db: AngularFirestore,
    private router: Router,
    private store: Store<AppState>,
    private slugService: SlugService
  ) { }

  getAll(): Observable<any> { // Observable<firebase.firestore.QuerySnapshot>
    return this.db.collection<Category>(this.collectionName, ref => ref.orderBy('lastModifiedDate', 'desc')).snapshotChanges(); //.get()
  }

  getOne(documentID: string): Observable<any> { // Observable<firebase.firestore.QuerySnapshot>
    return this.db.collection<Category>(this.collectionName).doc(documentID).snapshotChanges(); //.get()
  }

  delete(id: string): Promise<void>{
    return this.db.collection(this.collectionName).doc(id).delete();
  }

  edit(category: CategoryModel): Promise<void> {
    const categoryID = category.id;
    category.lastModifiedDate = new Date();
    category.slug = this.slugService.create(category.title);
    delete category.id;
    return this.db.collection(this.collectionName).doc(categoryID).update(category);
  }

  editPartial(id: string, category: Object): Promise<void> {
    return this.db.collection(this.collectionName).doc(id).update(category);
  }

  save(category: Category): Promise<void> { // Promise<DocumentReference> 
    category.createdDate = new Date();
    category.lastModifiedDate = new Date();
    category.slug = this.slugService.create(category.title);
    this.store.dispatch(loadingActions.isLoading());
    return this.db
               .collection(this.collectionName)
               .add(category)
               .then(resp => {
                 setTimeout(() => {
                   this.router.navigate(['/categories']);
                   this.store.dispatch(loadingActions.stopLoading());
                 }, 2000);
               })
               .catch(err => {
                 this.store.dispatch(loadingActions.stopLoading());
                 console.error(err);
               });
  }

}
