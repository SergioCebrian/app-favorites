import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private tokenKeyName: string = 'token';

  constructor(
    private storage: Storage
  ) { }

  setToken(resp: any): void {
    this.storage
        .get(this.tokenKeyName)
        .then((token: string) => {
          if (token === null) {
            resp.getIdToken().then((tokenID: string) => {
              this.storage.set(this.tokenKeyName, tokenID);
            });
          }
        });
  }

}
