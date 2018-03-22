import { Injectable } from '@angular/core';

@Injectable()
export class SignupService {
  public isSignupClicked: boolean;
  constructor() {
    this.isSignupClicked = false;
  }

}
