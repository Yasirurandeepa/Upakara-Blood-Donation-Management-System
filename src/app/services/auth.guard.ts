import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {LoginService} from "./login.service";


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private login: LoginService, private router: Router) {

  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.login.getUserLoggedIn() == false){
      this.router.navigate(['/']);
    }
    return this.login.getUserLoggedIn();
  }
}
