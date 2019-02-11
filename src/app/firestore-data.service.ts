import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs';
import { User } from './user';
import { People } from './people';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FirestoreDataService implements OnInit {
  userscollection: AngularFirestoreCollection<User>;

  users: Observable<User[]>;
  peoplecollection: AngularFirestoreCollection<People>;
  people: Observable<People[]>;
  userDoc: AngularFirestoreDocument<User>;
  peopleDoc: AngularFirestoreDocument<People>;
  constructor(public _afs: AngularFirestore) {
    this.peoplecollection = this._afs.collection('people', x => x.orderBy('name', 'asc'));
  }

  ngOnInit() {}



  getPeople() {
    this.people = this.peoplecollection.snapshotChanges().pipe(map(
      changes => {
        return changes.map(
          a => {
            const data = a.payload.doc.data() as People;
            data.id = a.payload.doc.id;
            return data;
          });

      }));
    return this.people;
  }
  addPeople(user) {
    this.peoplecollection.add(user);
  }
  deletePeople(user) {
    this.peopleDoc = this._afs.doc(`people/${user.id}`);
    this.peopleDoc.delete();
  }
  getPeopleById(id) {
    this.peopleDoc = this._afs.doc(`people/${id}`);
    // return this.peopleDoc.get();

    // this.peopleDoc.get().subscribe(res =>
    //   {
    //     // console.log(res)
    //   }
    // )
  }
  // getUsers() {
  //   return this.users;
  // }
  // addUser(user) {
  //   this.userscollection.add(user);
  // }
  // deleteUser(user) {
  //   this.userDoc = this._afs.doc(`users/${user.id}`);
  //   this.userDoc.delete();
  // }
}
