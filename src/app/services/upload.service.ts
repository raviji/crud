import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'firebase/storage';

export class FileUpload {

  key: string;
  name: string;
  url: string;
  file: File;
  city: string;
  tType: string;
  title: string;
  subTitle: string;
  eventDate: any;
  createdAt: any;
  constructor(file: File) {
      this.file = file;
  }
}

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private basePath = '/tournaments';
  private city: any;
  constructor(private db: AngularFireDatabase) { }

  pushFileToStorage(fileUpload: FileUpload, obj: any, progress: { percentage: number }) {
    console.log(obj);

    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
        // success
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('File available at', obj.eventDate);
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          fileUpload.title = obj.title;
          fileUpload.subTitle = obj.subTitle;
          fileUpload.city = obj.city;
          fileUpload.tType = obj.type;
          fileUpload.createdAt = Date.now();
          fileUpload.eventDate = obj.eventDate;
          console.log(fileUpload);
          if (fileUpload) {
            this.saveFileData(fileUpload);
          }
        });
      }
    );
  }

  private saveFileData(fileUpload: FileUpload) {
    this.db.list(`${this.basePath}/`).push(fileUpload);
  }

  getFileUploads(numberItems): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  deleteFileUpload(fileUpload: FileUpload) {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }
}
