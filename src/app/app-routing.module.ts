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
import { UserResolver } from './core/security/user.resolver';

export const rootRouterConfig: Routes = [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
      { path: 'home', component: DashboardComponent, resolve: { data: UserResolver} },
      { path: 'videos', component: VideosComponent, resolve: { data: UserResolver} },
      {
          path: 'people',
          component: ContributorsComponent,
        //   canActivate: [ AuthGuard ]
      },
      {
          path: 'share',
          component: CourtShareComponent,
        //   canActivate: [ AuthGuard ]
      },
      {
        path: 'tournaments',
        component: TournamentsComponent,
        // canActivate: [ AuthGuard ]
      },
      {
        path: 'players',
        component: PlayersComponent,
        // canActivate: [ AuthGuard ]
      },
      {
          path: '**',
          // redirectTo:'home',
          component: NotFoundComponent
      }
    ];
