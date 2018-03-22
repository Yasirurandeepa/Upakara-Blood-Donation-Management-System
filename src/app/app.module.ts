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
    SidebarDonorComponent
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
  providers: [SignupService, LoginService, SeekerService, DonorService, NotificationService, AuthGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
