import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {LoginService} from "./services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
     loginService: LoginService;

     constructor(public location: Location, private log: LoginService) {
       this.loginService = log;
       this.log.isLogin = Boolean(sessionStorage.getItem('isLoggedIn')).valueOf();
       this.log.type = sessionStorage.getItem('Type');
     }

    ngOnInit(){
    }

    isMap(path){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      titlee = titlee.slice( 1 );
      if(path == titlee){
        return false;
      }
      else {
        return true;
      }
    }
}
