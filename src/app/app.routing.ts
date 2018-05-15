import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { NotificationsComponent } from './notifications/notifications.component';
import {SearchComponent} from "./search/search.component";
import {SignupComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";
import {HeaderComponent} from "./header/header.component";
import {FactsComponent} from "./facts/facts.component";
import {FirstPageComponent} from "./first-page/first-page.component";
import {AboutComponent} from "./about/about.component";
import {AcceptedComponent} from "./accepted/accepted.component";
import {AuthGuard} from "./services/auth.guard";
import {AdminUserSearchComponent} from "./admin-user-search/admin-user-search.component";
import {ReportComponent} from "./report/report.component";

const routes: Routes =[
    { path: 'facts',      component: FactsComponent},
    { path: 'about',      component: AboutComponent},
    { path: 'signup',      component: SignupComponent},
    { path: 'login',           component: LoginComponent},
    { path: 'dashboard',  canActivate: [AuthGuard],    component: HomeComponent},
    // { path: 'header',      component: HeaderComponent },
    { path: 'user',  canActivate: [AuthGuard],  component: UserComponent},
    { path: 'accepted',   canActivate: [AuthGuard],  component: AcceptedComponent},
    { path: 'notifications',  canActivate: [AuthGuard], component: NotificationsComponent},
    { path: 'search',  canActivate: [AuthGuard],   component: SearchComponent},
    { path: 'admin_search',  canActivate: [AuthGuard],   component: AdminUserSearchComponent},
    { path: 'reports',  canActivate: [AuthGuard],   component: ReportComponent},
    { path: 'home',   component: FirstPageComponent},
    { path: '',          redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
