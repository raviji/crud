import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';


import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Share } from '../interface/share';
@Injectable({
  providedIn: 'root'
})
export class ShareService {
  shareCollection: AngularFirestoreCollection<Share>;
  share: Observable<Share[]>;
  shareDoc: AngularFirestoreDocument<Share>;
  constructor(public _afs: AngularFirestore) {
    this.shareCollection = this._afs.collection('share', ref => ref.orderBy('when', 'desc'));

   }

  getShare() {
    this.share = this.shareCollection.snapshotChanges().pipe(map(
      changes => {
        return changes.map(
          a => {
            const data = a.payload.doc.data() as Share;
            data.id = a.payload.doc.id;
            return data;
          });
      }));
    return this.share;
  }
  addShare(obj) {
    return this.shareCollection.add(obj).then((res) => {});
  }
  deleteShare(obj) {
    this.shareDoc = this._afs.doc(`share/${obj.id}`);
    this.shareDoc.delete();
  }
}
