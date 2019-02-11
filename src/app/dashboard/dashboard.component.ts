import { Component, OnInit, ViewChild, Inject, OnDestroy, AfterContentInit } from '@angular/core';
import { FirestoreDataService } from '../firestore-data.service';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { ShareService } from '../services/share.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';

export interface PeriodicElement {
  when: string;
  courtFee: number;
  id: string;
  totalAmount: number;
  toDate: string;
  whoPlayed: Array<any>;
  shareSheet: Array<any>;
  people: Array<any>;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterContentInit {
  displayedColumns: string[] = ['when', 'courtFee', 'id'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  shareData: any;
  peopleList: any;
  sum: any = [];
  hidden: Boolean = false;
  deleteRecord: Boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public _data: FirestoreDataService, public route: ActivatedRoute,
    private spinner: NgxSpinnerService, private _shareData: ShareService, public dialog: MatDialog) {
    }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params.delete === 's') {
        this.deleteRecord = true;
      }
    });
    this.spinner.show();
    this._data.getPeople().subscribe(
      res => {
        this.peopleList = res;
        this.spinner.hide();
      });
    this._shareData.getShare().subscribe(
      data => {
        this.shareData = data;
        this.dataSource.data = this.shareData;
        this.spinner.hide();
        console.log(data);
        if (data) {this.calculateShareAmount(this.shareData); }
      });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  calculateShareAmount(arr) {
    // Calculate Shares total by id
    const totalPaid = [];
    if (this.peopleList.length > 0) {
      for (const ids of this.peopleList) {
        // console.log('start', ids.id);
        let a = 0;
        let p = 0;
        // console.log(a);
        for (const s of arr) {
          s.shareSheet.forEach(function(i) {
            if (i.id === ids.id) {
              // if (i.court > 0) {
                 a = a + i.court + i.shuttle;
              // }
              p = p + i.played;
            }
          });
        }
        // console.log(a, ids.id);
        this.sum.push({id : ids.id, totalPaid : a, totalPlayed : p, toPay: a - p});
      }
      console.log(this.sum);
    }
  }

  ngAfterContentInit() { }



  ngOnDestroy() {}
  delete(id) {
    // console.log(id.id)
   this._shareData.deleteShare(id);
  }
  showPop(element): void {
    element.people = this.peopleList;
    // console.log(element)
    const dialogRef = this.dialog.open(AppShareDataDialogComponent, {
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}

// Dialog Box

@Component({
  selector: 'app-share-data-dialog-component',
  templateUrl: 'share-data-dialog.component.html',
})
export class AppShareDataDialogComponent {
  peopleList: any;
  realOne: any;
  constructor(
    public dialogRef: MatDialogRef<AppShareDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public _datas: PeriodicElement) {
      console.log(this._datas);

      }



  onNoClick(): void {
    this.dialogRef.close();
  }
}
