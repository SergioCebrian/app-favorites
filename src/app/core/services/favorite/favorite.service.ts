import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '@store/state/app.state';
import * as loadingActions from '@store/actions/loading.actions';

import { Favorite } from '@interfaces/favorite';
import { FavoriteModel } from '@models/favorite.model';
import { SlugService } from '@helpers/slug/slug.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private collectionName: string = 'favorites';

  constructor(
    private db: AngularFirestore,
    private store: Store<AppState>,
    private slugService: SlugService
  ) { }

  getAll(): Observable<any> { // Observable<firebase.firestore.QuerySnapshot>
    return this.db.collection<Favorite>(this.collectionName, ref => ref.orderBy('lastModifiedDate', 'desc')).snapshotChanges();
  }

  getAllByCategory(categoryID: string): Observable<any> {
    return this.db.collection<Favorite>(this.collectionName, ref => ref.where('category_id', '==', categoryID)).snapshotChanges();
  }

  getAllByImportants(): Observable<any> {
    return this.db.collection<Favorite>(this.collectionName, ref => ref.where('important', '==', true)).snapshotChanges();
  }

  getAllByVisits(): Observable<any> {
    return this.db.collection<Favorite>(this.collectionName, ref => ref.orderBy('visits', 'desc').where('visits', '>', 0)).snapshotChanges();
  }

  getOne(documentID: string): Observable<any> { // Observable<firebase.firestore.QuerySnapshot>
    return this.db.collection<Favorite>(this.collectionName).doc(documentID).snapshotChanges();
  }

  delete(id: string): Promise<void>{
    return this.db.collection(this.collectionName).doc(id).delete();
  }

  edit(favorite: FavoriteModel): Promise<void> {
    const favoriteID = favorite.id;
    favorite.lastModifiedDate = new Date();
    favorite.slug = this.slugService.create(favorite.title);
    delete favorite.id;
    return this.db.collection(this.collectionName).doc(favoriteID).update(favorite);
  }

  editPartial(favoriteID: string, favorite: FavoriteModel): Promise<void> {
    favorite.lastModifiedDate = new Date();
    return this.db.collection(this.collectionName).doc(favoriteID).update(favorite);
  }

  save(favorite: Favorite): Promise<void> { // Promise<DocumentReference>
    favorite.createdDate = new Date();
    favorite.lastModifiedDate = new Date();
    favorite.slug = this.slugService.create(favorite.title);
    favorite.visits = 0;
    this.store.dispatch(loadingActions.isLoading());
    return this.db
               .collection(this.collectionName)
               .add(favorite)
               .then(resp => {
                  this.store.dispatch(loadingActions.stopLoading());
               })
               .catch(err => {
                 this.store.dispatch(loadingActions.stopLoading());
                 console.error(err);
               });
  }

}
