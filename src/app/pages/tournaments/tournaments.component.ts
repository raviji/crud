import { Component, OnInit, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { UploadFileService, FileUpload } from 'src/app/services/upload.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
  // myForm: FormGroup;
  fileUploads: any[];
  // selectedFiles: FileList;
  currentFileUpload: FileUpload;
  cities: string[] = ['Bangalore', 'Chennai', 'Hydrabad', 'Kerala'];
  tTypes: any = ['Kids', `Adults`, `Kids & Adults`];
  // progress: { percentage: number } = { percentage: 0 };
  // myControl = new FormControl();
  public future: string[] = ['Upcoming', 'Past'];
  selectedFuture: any;
  selectedtTypes: any;
  selectedCity: any;
  constructor(private uploadService: UploadFileService, public dialog: MatDialog, private spinner: NgxSpinnerService) {
    this.selectedFuture = this.future[0];
    this.selectedtTypes = this.tTypes[2];
    this.selectedCity   = this.cities[0];
    alert("loading");
    this.spinner.show();
   }

  ngOnInit() {
    this.spinner.show();
  //   this.myForm = this.fb.group({
  //     title: [''],
  //     subTitle: [''],
  //     eventDate: [''],
  //     city: ['']
  // });
    // Use snapshotChanges().pipe(map()) to store the key
    this.uploadService.getFileUploads(6).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe((fileUploads: any) => {
      this.fileUploads = fileUploads;
      this.spinner.hide();
      console.log('firebase:', this.fileUploads);
    });
  }
  // selectFile(event) {
  //   const file = event.target.files.item(0);

  //   if (file.type.match('image.*')) {
  //     this.selectedFiles = event.target.files;
  //   } else {
  //     alert('invalid format!');
  //   }
  // }

  upload() {
    // const file = this.selectedFiles.item(0);
    // this.selectedFiles = undefined;

    // this.currentFileUpload = new FileUpload(file);
    // console.log(this.currentFileUpload);
    // this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress);
  }
  convertDate(obj: any) {
    return new Date(obj);
  }
  removeItem(fileUpload: FileUpload) {
    // console.log(fileUpload);
    this.uploadService.deleteFileUpload(fileUpload);
  }

  showPop(): void {
    const dialogRef = this.dialog.open(AppAddDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}

// Dialog Box

@Component({
  selector: 'app-add-dialog-component',
  templateUrl: 'add-dialog.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class AppAddDialogComponent implements OnInit {
  peopleList: any;
  realOne: any;
  addTourney: FormGroup;
  fileUploads: any[];
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };
  cities: string[] = ['Bangalore', 'Chennai', 'Hydrabad', 'Kerala'];
  tTypes: any = ['Kids', `Adults`, `Both`];
  constructor(
    public dialogRef: MatDialogRef<AppAddDialogComponent>,
    public fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private uploadService: UploadFileService
    ) {
      // console.log(this._datas);
      }
    ngOnInit() {
      // this.spinner.show();
      this.addTourney = this.fb.group({
        title: [''],
        subTitle: [''],
        eventDate: [''],
        city: [''],
        type: ['']
      });
      // this.uploadService.getFileUploads(6).snapshotChanges().pipe(
      //   map(changes =>
      //     changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      //   )
      // ).subscribe((fileUploads: any) => {
      //   this.fileUploads = fileUploads;
      //   console.log('firebase:', fileUploads);
      // });
    }
  onNoClick(): void {
    this.dialogRef.close();
  }
  private convertDate(obj: any) {
    return new Date(obj);
  }
  selectFile(event) {
    const file = event.target.files.item(0);

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
  }

  onSubmit(obj: any) {
    this.spinner.show();
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.currentFileUpload = new FileUpload(file);
    // console.log(obj.value);
    obj.value.eventDate = obj.value.eventDate.toString();
    this.uploadService.pushFileToStorage(this.currentFileUpload, obj.value, this.progress);
    this.dialogRef.close();
    this.spinner.hide();
  }
}
