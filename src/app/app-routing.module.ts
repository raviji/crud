import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent, AppShareDataDialogComponent } from './dashboard/dashboard.component';
import { CourtShareComponent } from './court-share/court-share.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContributorsComponent } from './contributors/contributors.component';
import { VideosComponent } from './videos/videos.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/security/auth.guard';
import { TournamentsComponent } from './pages/tournaments/tournaments.component';
import { PlayersComponent } from './pages/players/players.component';

    const routes: Routes = [
      { path: '', redirectTo: 'tournaments', pathMatch: 'full' },
      {
          path: 'home',
          component: DashboardComponent,
          // canActivate: [ AuthGuard ]
      },
      {
          path: 'videos',
          component: VideosComponent,
      },
      {
          path: 'people',
          component: ContributorsComponent
      },
      {
          path: 'share',
          component: CourtShareComponent
      },
      {
        path: 'tournaments',
        component: TournamentsComponent
      },
      {
        path: 'players',
        component: PlayersComponent
      },
      { path: 'login', component: LoginComponent },
      {
          path: '**',
          // redirectTo:'home',
          component: NotFoundComponent
      }
    ];

    @NgModule({
        imports: [
            RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
        ],
        exports: [
            RouterModule
        ],
        declarations: []
    })
    export class AppRoutingModule { }

    export const AppRoutingComponents = [
        DashboardComponent,
        ContributorsComponent,
        CourtShareComponent,
        NotFoundComponent,
        AppShareDataDialogComponent,
        VideosComponent
    ];
