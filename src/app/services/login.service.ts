import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

  private isUserLoggedIn: boolean;
  public isLogin: boolean;
  public isLoginClicked: boolean;
  public userName: string;
  public type: string;

  constructor() {
    this.isLogin = false;
    this.isUserLoggedIn = false;
    this.isLoginClicked = false;
  }

  setUserLoggedIn() {       //set user login.js state as true if he logged in
    this.isUserLoggedIn = true;
  }

  getUserLoggedIn() {       //get the user logged in state
    return this.isUserLoggedIn;
  }

}
