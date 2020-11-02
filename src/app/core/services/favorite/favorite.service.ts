import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { combineLatest, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from '@store/state/app.state';
import * as loadingActions from '@store/actions/loading.actions';
import * as ACTIONS_FAVORITE from '@modules/favorites/store/actions/favorites.actions';
import { Favorite } from '@interfaces/favorite';
import { FavoriteModel } from '@models/favorite.model';
import { SlugService } from '@helpers/slug/slug.service';
import { first, flatMap, map, mergeMap, switchMap } from 'rxjs/operators';

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
    return this.db
               .collection<Favorite>(this.collectionName, ref => ref.orderBy('lastModifiedDate', 'desc'))
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
    return this.db.collection<Favorite>(this.collectionName).doc(documentID).snapshotChanges();
  }

  delete(id: string): Promise<void> {
    this.store.dispatch(ACTIONS_FAVORITE.deleteFavoriteSuccess({ id }));
    return this.db.collection(this.collectionName).doc(id).delete();
  }

  edit(favorite: FavoriteModel): Promise<void> {
    const favoriteID = favorite.id;
    favorite.lastModifiedDate = new Date();
    favorite.slug = this.slugService.create(favorite.title);
    delete favorite.id;
    this.store.dispatch(ACTIONS_FAVORITE.updateFavoriteSuccess({ favorite }));
    return this.db.collection(this.collectionName).doc(favoriteID).update(favorite);
  }

  editPartial(favoriteID: string, favorite: FavoriteModel): Promise<void> {
    favorite.lastModifiedDate = new Date();
    delete favorite.id;
    this.store.dispatch(ACTIONS_FAVORITE.updateFavoriteSuccess({ favorite }));
    return this.db.collection(this.collectionName).doc(favoriteID).update(favorite);
  }

  save(favorite: Favorite): Promise<void> { // Promise<DocumentReference>
    favorite.createdDate = new Date();
    favorite.lastModifiedDate = new Date();
    favorite.slug = this.slugService.create(favorite.title);
    favorite.visits = 0;
    this.store.dispatch(ACTIONS_FAVORITE.createFavoriteSuccess({ favorite }));
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
