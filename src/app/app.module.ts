import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {FormsModule} from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import {UserService} from './Services/user.service';
import {Http, HttpModule} from '@angular/http';
import {SignupService} from "./services/signup.service";
import {LoginService} from "./services/login.service";
import { HomeComponent } from './home/home.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SearchComponent } from './search/search.component';
import { UserComponent } from './user/user.component';
import {NavbarModule} from "./shared/navbar/navbar.module";
import {SidebarModule} from "./sidebar/sidebar.module";
import {AppRoutingModule} from "./app.routing";
import {LbdModule} from "./lbd/lbd.module";
import {SeekerService} from "./services/seeker.service";
import { FactsComponent } from './facts/facts.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { AboutComponent } from './about/about.component';
import {NotificationService} from "./services/notification.service";
import { AcceptedComponent } from './accepted/accepted.component';
import {AuthGuard} from "./services/auth.guard";
import { SidebarDonorComponent } from './sidebar-donor/sidebar-donor.component';
import {DonorService} from "./services/donor.service";
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin.component';
import { AdminUserSearchComponent } from './admin-user-search/admin-user-search.component';
import {AdminService} from "./services/admin.service";
import { ReportComponent } from './report/report.component';
import {ReportService} from "./services/report.service";
import {RateService} from "./services/rate.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    NotificationsComponent,
    SearchComponent,
    UserComponent,
    FactsComponent,
    FirstPageComponent,
    AboutComponent,
    AcceptedComponent,
    SidebarDonorComponent,
    SidebarAdminComponent,
    AdminUserSearchComponent,
    ReportComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    NavbarModule,
    SidebarModule,
    RouterModule,
    AppRoutingModule,
    LbdModule,
  ],
  providers: [SignupService, LoginService, AdminService, SeekerService, DonorService, NotificationService, ReportService, AuthGuard, UserService, RateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
