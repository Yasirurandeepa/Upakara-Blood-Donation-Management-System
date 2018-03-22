import {Component, OnInit, style} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../Services/user.service';
import {LoginService} from "../services/login.service";
import index from "@angular/cli/lib/cli";
// import {sendMsg} from './login';
declare var $: any;

  @Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
  loginService: LoginService;
  valUsername: string;
  valPassword: string;
  isValid: boolean;

  constructor(private router: Router, private user: UserService, private log: LoginService) {
    this.loginService = log;
  }

  ngOnInit() {
    if(this.log.isLoginClicked = true){
      this.openLoginModal();
    }
  }


  showLoginForm(){
    $('.secondBox').fadeOut('fast');
    $('#loginModal .registerBox').fadeOut('fast',function(){
      $('.loginBox').fadeIn('fast');
      $('.register-footer').fadeOut('fast',function(){
        $('.login-footer').fadeIn('fast');
      });
    });
    $('.error').removeClass('alert alert-danger').html('');
  }

  openLoginModal(){
    this.showLoginForm();
    setTimeout(function(){
      $('#loginModal').modal('show');
    }, 230);

  }

  login() {

    if (this.validate()) {
      const username = document.forms['loginForm']['username'].value;
      const password = document.forms['loginForm']['password'].value;
      this.user.searchUser({
        username: username,
        password: password,
        key: 'key'
      }).subscribe(
        result => {
          if (result.length)  {
            // console.log(result[0].password);
            this.loginService.userName = username;
            sessionStorage.setItem('currentUser', username);        //set session user's name to current user's name

            const type = result[0].type;
            sessionStorage.setItem('Type',type);
            this.log.type = sessionStorage.getItem('Type');

            this.log.setUserLoggedIn();
            alert('You are logged in!!!');

            sessionStorage.setItem('isLoggedIn', 'true');
            this.log.isLogin = Boolean(sessionStorage.getItem('isLoggedIn')).valueOf();

            $('#loginModal').modal('hide');
            this.router.navigate(['dashboard']);
          } else {
            this.valUsername = '';
            this.valPassword = 'Username and Password mismatched!!!';
            alert('Invalid User!!!');
          }
        }, error => {
          console.log(error);
          alert('Not a valid User!!!');
        }
      );
    }
  }

  validate() {
    this.isValid = true;
    const username = document.forms['loginForm']['username'].value;
    const password = document.forms['loginForm']['password'].value;
    if(username === ''){
      this.valUsername = 'This is a required field';
      this.isValid = false;
      if(password !== ''){
        this.valPassword = '';
      }
    }
    if(password === ''){
      this.valPassword = 'This is a required field';
      this.isValid = false;
      if(username !== ''){
        this.valUsername = '';
      }
    }
    if(this.isValid === true){
      return true;
    }else{
      return false;
    }
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
        to: '+94716220859',
        from: '+94716220786',
        body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
      })
      .then(message => console.log(message.sid));
  }*/
}

