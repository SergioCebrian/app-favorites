import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData, DocumentReference, QuerySnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '@store/state/app.state';
import * as loadingActions from '@modules/loading/store/actions/loading.actions';
import * as ACTIONS_CATEGORY from '@modules/categories/store/actions/categories.actions';
import { ICategory } from '@interfaces/category';
import { CategoryModel } from '@models/category.model';
import { SlugService } from '@helpers/slug/slug.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private collectionName: string = 'categories';

  constructor(
    private db: AngularFirestore,
    private store: Store<AppState>,
    private slugService: SlugService
  ) { }

  getAll(): Observable<ICategory[]> {
    return this.db
               .collection<ICategory>(this.collectionName, ref => ref.orderBy('lastModifiedDate', 'desc'))
               .snapshotChanges()
               .pipe(
                 map(actions => actions.map(values => {
                  return {
                    id: values.payload.doc.id,
                    ...values.payload.doc.data()
                  }
                 }))
               );
  }

  getOne(documentID: string): Observable<any> { // Observable<firebase.firestore.QuerySnapshot>
    return this.db.collection<ICategory>(this.collectionName).doc(documentID).snapshotChanges(); //.get()
  }

  delete(id: string): Promise<void> {
    this.store.dispatch(ACTIONS_CATEGORY.deleteCategorySuccess({ id }));
    return this.db.collection(this.collectionName).doc(id).delete();
  }

  edit(category: CategoryModel): Promise<void> {
    const categoryID = category.id;
    category.lastModifiedDate = new Date();
    category.slug = this.slugService.create(category.title);
    delete category.id;
    this.store.dispatch(ACTIONS_CATEGORY.updateCategorySuccess({ category }));
    return this.db.collection(this.collectionName).doc(categoryID).update(category);
  }

  editPartial(id: string, category: CategoryModel): Promise<void> {
    this.store.dispatch(ACTIONS_CATEGORY.updateCategorySuccess({ category }));
    return this.db.collection(this.collectionName).doc(id).update(category);
  }

  save(category: ICategory): Promise<void> { // Promise<DocumentReference> 
    category.createdDate = new Date();
    category.lastModifiedDate = new Date();
    category.slug = this.slugService.create(category.title);
    this.store.dispatch(ACTIONS_CATEGORY.createCategorySuccess({ category }));
    this.store.dispatch(loadingActions.isLoading());
    return this.db
               .collection(this.collectionName)
               .add(category)
               .then(resp => {
                   this.store.dispatch(loadingActions.stopLoading());
               })
               .catch(err => {
                 this.store.dispatch(loadingActions.stopLoading());
                 console.error(err);
               });
  }

}
