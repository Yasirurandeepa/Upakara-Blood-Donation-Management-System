import {Component, OnInit, style} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../Services/user.service';
import {LoginService} from "../services/login.service";
import swal from 'sweetalert';
import {SignupService} from "../services/signup.service";
import {createInput} from "@angular/compiler/src/core";
import {type} from "os";
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
  verification_code: number;

  constructor(private router: Router, private user: UserService, private log: LoginService, private sms: SignupService) {
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
        $('.login.js-footer').fadeIn('fast');
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
    // this.sms.sendSms().subscribe(
    //   result => {
    //     this.verification_code = result.verification_code;
    //     console.log(typeof (result.verification_code));
    //     console.log(result);
    //   }
    // );

    // swal("Write something here:", {
    //   content: {
    //     element: "input",
    //   },
    // })
    //   .then((value) => {
    //   this.verify = Number(value);
    //     if (this.verification_code === this.verify) {
    //       swal("You have successfully registered!", {
    //         icon: "success",
    //       });
    //     } else {
    //       swal("Verification code is Incorrect!");
    //     }
    //   });




    // swal("Write something here:", {
    //   content: {
    //     element: "input",
    //   },
    // })
    //   .then((value) => {
    //     swal(`You typed: ${value}`);
    //   });


    // swal({
    //   content: {
    //     element: "input",
    //     attributes: {
    //       placeholder: "Enter your verification code",
    //       type: "text",
    //     },
    //   },
    // });

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
            swal("Login Successful!", "You are successfully logged in!", "success");

            sessionStorage.setItem('isLoggedIn', 'true');
            this.log.isLogin = Boolean(sessionStorage.getItem('isLoggedIn')).valueOf();

            $('#loginModal').modal('hide');
            if(type=='Admin'){
              this.router.navigate(['admin_search']);
            }
            if(type=='Seeker'){
              this.router.navigate(['user']);
            }
            if(type=='Donor'){
              this.router.navigate(['user']);
            }

          } else {
            this.valUsername = '';
            this.valPassword = 'Username and Password mismatched!!!';
            swal("", "User not found!", "info");
          }
        }, error => {
          console.log(error);
          swal("Not a valid User!!!");
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
}

