import { Component, OnInit, ViewChild } from '@angular/core';
import { FirestoreDataService } from './firestore-data.service';
import { User } from './user';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSidenav} from '@angular/material/sidenav';
import { SwUpdate } from '@angular/service-worker';
import { AuthService } from './core/security/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(MatSidenav) drawer: MatSidenav;
  arr: User[] = [];
  model = { firstname: '', lastname: '', mobile: '' };
  constructor(public _data: FirestoreDataService, ar: ActivatedRoute,
    private _router: Router,
    private swUpdate: SwUpdate,
    private auth: AuthService,
    private route: ActivatedRoute) {
  }
  ngOnInit() {
      this.swUpdate.available.subscribe(() => {
        this.swUpdate.activateUpdate().then(() => document.location.reload());
          if (confirm('New version available. Load New Version?')) {
            window.location.reload();
          }
        });

    }

    closeMenu() {
      this.drawer.close();
    }
    logout() {
      this.auth.logout();
    }
}

