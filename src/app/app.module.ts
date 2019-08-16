import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFirestore } from 'angularfire2/firestore';
import { rootRouterConfig } from './app-routing.module';
import { YoutubePlayerModule } from 'ngx-youtube-player';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppShareDataDialogComponent, DashboardComponent } from './dashboard/dashboard.component';
import { MyFilterPipe } from './pipes/filter.pipe';
import { SafeUrlPipe } from './core/security/safe-url.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AuthService } from './core/security/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { EventsComponent } from './events/events.component';
import { TournamentsComponent, AppAddDialogComponent } from './pages/tournaments/tournaments.component';
import { PlayersComponent } from './pages/players/players.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { UserService } from './core/user.service';
import { AuthGuard } from './core/security/auth.guard';
import { UserResolver } from './core/security/user.resolver';
import { RouterModule } from '@angular/router';
import { ContributorsComponent } from './contributors/contributors.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CourtShareComponent } from './court-share/court-share.component';
import { VideosComponent } from './videos/videos.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { PagesModule } from './pages/pages.module';
 //     DashboardComponent,
    //     ContributorsComponent,
    //     CourtShareComponent,
    //     NotFoundComponent,
    //     AppShareDataDialogComponent,
    //     VideosComponent

@NgModule({
  declarations: [
    AppComponent,
    MyFilterPipe,
    SafeUrlPipe,
    DashboardComponent,
    ContributorsComponent,
    CourtShareComponent,
    NotFoundComponent,
    AppShareDataDialogComponent,
    VideosComponent,
    LoginComponent,
    EventsComponent,
    TournamentsComponent,
    AppAddDialogComponent,
    PlayersComponent
  ],
  entryComponents: [ AppShareDataDialogComponent, AppAddDialogComponent],
  imports: [
    YoutubePlayerModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    // AppRoutingModule,
    // shared module
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true }),
    AngularFireModule.initializeApp(environment.firebase, {databaseURL: 'https://rscs-5d73d.firebaseio.com'}),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireDatabaseModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }), // for database
  ],
  providers: [
    AngularFirestore,
    AuthService,
    AngularFireAuth, UserService, AuthGuard, UserResolver,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
