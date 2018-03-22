import { Component, OnInit } from '@angular/core';
import {SignupService} from "../services/signup.service";
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  signupService: SignupService;
  loginService: LoginService;
  constructor(private signup: SignupService, private login: LoginService, private router: Router) {
    this.signupService = signup;
    this.loginService = login;
    this.login.isLogin = false;
  }

  signupClicked(){
    if(this.signup.isSignupClicked = true) {
      this.router.navigate(['login']);
    }
    this.signup.isSignupClicked = true;
  }

  loginClicked(){
    if(this.login.isLoginClicked = true){
      this.router.navigate(['signup']);
    }
    this.login.isLoginClicked = true;
  }

  ngOnInit() {
  }

  /*SendSMS() {
    console.log('send');
    // Twilio Credentials
    const accountSid = 'ACfe1b9bb3073c21d24eb8a0ba34d0708a';
    const authToken = 'c1caf0c048993a0964703b74ad2f9813';
    // require the Twilio module and create a REST client
    const client = require('twilio')(accountSid, authToken);

    client.messages
      .create({
        to: '+94719360004',
        from: '+13022519234',
        body: 'Weeesa balla',
      })
      .then(message => console.log(message.sid));
  }*/
}
