import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../Services/user.service';
import {SignupService} from "../services/signup.service";
import {LoginService} from "../services/login.service";
import {and} from "@angular/router/src/utils/collection";
import * as EmailValidator from 'email-validator';
import * as passwordValidator from 'password-validator';
declare var $: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {

  schema: any;

  username: string;
  email: string;
  password: string;
  pass_conf: string;
  gender: string;
  nic: string;
  blood_group: string;
  contact_no: string;
  address: string;
  district: string;

  isValid: boolean;
  userService: UserService;
  valName: string;
  valUserName: string;
  valPassword: string;
  valRePassword: string;
  valNIC: string;
  valDob: string;
  valGender: string;
  valGroup: string;
  valContact: string;
  valEmail: string;
  valAddress: string;
  valDistrict: string;
  valDivision: string;

  signupService: SignupService;
  loginService: LoginService;

  constructor(private router: Router, private user: UserService,private signup: SignupService, private login: LoginService) {

    this.userService = user;
    this.signupService = signup;
    this.loginService = login;

    // Add properties to it
    this.schema = new passwordValidator;
    this.schema
      .is().min(8)                                    // Minimum length 8
      .is().max(100)                                  // Maximum length 100
      .has().uppercase()                              // Must have uppercase letters
      .has().lowercase()                              // Must have lowercase letters
      .has().digits()                                 // Must have digits
      .has().not().spaces()                           // Should not have spaces
      .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
  }

  ngOnInit() {
    if(this.signup.isSignupClicked = true){
      this.openRegisterModal();
    }
  }

  ///////////////////////////donor//////////////////////////////////
  showRegisterFormDonor(){                                        //Show register form of donor
    this.valUserName = '';
    this.valEmail = '';
    this.valPassword = '';
    this.valRePassword = '';
    $('.loginBox').fadeOut('fast',function(){
      $('.registerBox').fadeIn('fast');
      $('.modal-title').html('Register as a Donor');
    });
    $('.error').removeClass('alert alert-danger').html('');
  }

  showSecondStepDonor() {                                         //Show second step of donor register form
    this.valUserName = '';
    this.valEmail = '';
    this.valPassword = '';
    this.valRePassword = '';
    this.username = document.forms['donorForm1']['username'].value;
    this.email = document.forms['donorForm1']['email'].value;
    this.password = document.forms['donorForm1']['password'].value;
    this.pass_conf = document.forms['donorForm1']['password_confirmation'].value;
    if(this.username==''){
      this.valUserName = 'This is a required field';
    }
    if(this.email==''){
      this.valEmail = 'This is a required field';
    }
    if(this.password==''){
      this.valPassword = 'This is a required field';
    }
    if(this.pass_conf==''){
      this.valRePassword = 'This is a required field';
    }
    if(!EmailValidator.validate(this.email)){               //check valid email address
      // console.log(EmailValidator.validate("test@gmail.com"));
      this.valEmail = "invalid email";
    }
    if(this.password.length<8){
      console.log(this.schema.validate(this.password, { list: true }));
      this.valPassword = "Password must contain atleast 8 characters"
    }else if(!this.schema.validate(this.password)){
      this.valPassword = "Password must contain digits, simple and capital letters and not contain any spaces"
    }else if(this.password!=this.pass_conf){
      this.valRePassword = "password mismatched"
    }


    if(this.username!='' && this.email!='' && this.password!='' && this.pass_conf!='' && this.schema.validate(this.password) && this.password==this.pass_conf && EmailValidator.validate(this.email)){


      $('.loginBox').fadeOut('fast');
      $('.registerBox').fadeOut('fast',function(){
        $('.secondBox').fadeIn('fast');
        $('.modal-title').html('Register as a Donor');
      });
      $('.error').removeClass('alert alert-danger').html('');
    }

  }

  backToFirstStepDonor() {                                       //Change second step to first step in donor form
    $('.secondBox').fadeOut('fast',function(){
      $('.registerBox').fadeIn('fast');
      $('.modal-title').html('Register as a Donor');
    });
    $('.error').removeClass('alert alert-danger').html('');
  }
  backToSecondStepDonor() {                                     //Change third step to second step in donor form
    $('.thirdBox').fadeOut('fast',function(){
      $('.secondBox').fadeIn('fast');
      $('.modal-title').html('Register as a Donor');
    });
    $('.error').removeClass('alert alert-danger').html('');
  }
  showThirdStepDonor() {                                       //Show third step of register form
    this.valNIC = '';
    this.gender = document.forms['donorForm2']['gender'].value;
    this.nic = document.forms['donorForm2']['nic'].value;
    this.blood_group = document.forms['donorForm2']['blood_group'].value;

    if(this.nic==''){
      this.valNIC = "This is required field";
    } else if(this.nic.length!=10 || (this.nic.charAt(this.nic.length-1)!='v' && this.nic.charAt(this.nic.length-1)!='V') || !/^[0-9]+$/.test(this.nic.substring(0,this.nic.length-1))) {     //check valid NIC
      this.valNIC = "Invalid NIC"
    }
    else{
      $('.secondBox').fadeOut('fast',function(){
        $('.thirdBox').fadeIn('fast');
        $('.modal-title').html('Register as a Donor');
      });
      $('.error').removeClass('alert alert-danger').html('');
    }
  }

  confirmDonor() {
    this.valAddress = '';
    this.valContact = '';
    this.contact_no = document.forms['donorForm3']['contact_no'].value;
    this.address = document.forms['donorForm3']['address'].value;
    this.district = document.forms['donorForm3']['district'].value;

    if(this.address==''){                                                 //check
      this.valAddress = "This is required field";
    }
    if(this.contact_no==''){
      this.valContact = "This is required field";
    }else if(!/^[0-9]+$/.test(this.contact_no) || this.contact_no.length !== 10) {
      this.valContact = "Invalid contact number";
    }else if(this.contact_no!='' && this.address!='') {
      this.user.addDonor({
        username: this.username,
        email: this.email,
        gender: this.gender,
        nic: this.nic,
        blood_group: this.blood_group,
        contact_no: this.contact_no,
        address: this.address,
        district: this.district,
        type: "Donor"
      }).subscribe(
        result => {
          console.log(result);
          //this.router.navigate(['slider']);
        }, error => {
          console.log(error);
        }
      );
      this.user.addUserDonor({
        username: this.username,
        password: this.password,
        type: "Donor",
        key: 'key'
      }).subscribe(
        result => {
          console.log(result);
          alert("You have Successfully Registered as a donor");
          //this.router.navigate(['slider']);
        }, error => {
          console.log(error);
        }
      );
    }
    if(this.address==''){
      document.forms['donorForm3']['address'].value = "This is a required field";
    }

  }



  ///////////////////////////seeker/////////////////////////////////

  showRegisterFormSeeker(){                                       //Show register form of donor
    this.valUserName = '';
    this.valEmail = '';
    this.valPassword = '';
    this.valRePassword = '';
    $('.registerBox').fadeOut('fast',function(){
      $('.loginBox').fadeIn('fast');
      $('.modal-title').html('Register as a Seeker');
    });
    $('.error').removeClass('alert alert-danger').html('');
  }

  showSecondStepSeeker() {                                       //Show second step of seeker register form
    this.valUserName = '';
    this.valEmail = '';
    this.valPassword = '';
    this.valRePassword = '';
    this.username = document.forms['formSeeker1']['username'].value;
    this.email = document.forms['formSeeker1']['email'].value;
    this.password = document.forms['formSeeker1']['password'].value;
    this.pass_conf = document.forms['formSeeker1']['password_confirmation'].value;
    if(this.username==''){
      this.valUserName = 'This is a required field';
    }
    if(this.email==''){
      this.valEmail = 'This is a required field';
    }
    if(this.password==''){
      this.valPassword = 'This is a required field';
    }
    if(this.pass_conf==''){
      this.valRePassword = 'This is a required field';
    }
    if(!EmailValidator.validate(this.email)){               //check valid email address
      // console.log(EmailValidator.validate("test@gmail.com"));
      this.valEmail = "invalid email";
    }
    if(this.password.length<8){
      console.log(this.schema.validate(this.password, { list: true }));
      this.valPassword = "Password must contain atleast 8 characters"
    }else if(!this.schema.validate(this.password)){
      this.valPassword = "Password must contain digits, simple and capital letters and not contain any spaces"
    }else if(this.password!=this.pass_conf){
      this.valRePassword = "password mismatched"
    }


    if(this.username!='' && this.email!='' && this.password!='' && this.pass_conf!='' && this.schema.validate(this.password) && this.password==this.pass_conf && EmailValidator.validate(this.email)){
      $('.loginBox').fadeOut('fast', function () {
        $('.SeekersecondBox').fadeIn('fast');
        $('.modal-title').html('Register as a Seeker');
      });
      $('.error').removeClass('alert alert-danger').html('');
    }
  }

  backToFirstStepSeeker() {                                      //change second step to first step in seeker register form
    $('.SeekersecondBox').fadeOut('fast',function(){
      $('.loginBox').fadeIn('fast');
      $('.modal-title').html('Register as a Seeker');
    });
    $('.error').removeClass('alert alert-danger').html('');
  }

  addSeeker() {                                             //Confirm seeker registration form
    this.contact_no = document.forms['formSeeker2']['contact_no'].value;
    this.gender = document.forms['formSeeker2']['gender'].value;
    this.nic = document.forms['formSeeker2']['nic'].value;
    this.blood_group = document.forms['formSeeker2']['blood_group'].value;

    if(this.nic=='') {
      document.forms['formSeeker2']['nic'].value = "This is required field";
    } if (!/^[0-9]+$/.test(this.contact_no) || this.contact_no.length !== 10) {
      document.forms['formSeeker2']['contact_no'].value = "Invalid contact number";
    } else if (this.contact_no != '' && this.nic != '') {
      this.user.addSeeker({
        username: this.username,
        email: this.email,
        contact_no: this.contact_no,
        gender: this.gender,
        nic: this.nic,
        blood_group: this.blood_group,
        type: "Seeker"
      }).subscribe(
        result => {
          console.log(result);
          //this.router.navigate(['slider']);
        }, error => {
          console.log(error);
        }
      );
      this.user.addUserSeeker({
        username: this.username,
        password: this.password,
        type: "Seeker",
        key: 'key'
      }).subscribe(
        result => {
          console.log(result);
          alert("You have Successfully Registered as a seeker");
          //this.router.navigate(['slider']);
        }, error => {
          console.log(error);
        }
      );
    }
  }

  openLoginModal(){
    this.showRegisterFormSeeker();
    setTimeout(function(){
      $('#loginModal').modal('show');
    }, 230);

  }
  openRegisterModal(){
    this.showRegisterFormDonor();
    setTimeout(function(){
      $('#loginModal').modal('show');
    }, 230);

  }

  sendMsg() {
    // Twilio Credentials
    const accountSid = 'ACfe1b9bb3073c21d24eb8a0ba34d0708a';
    const authToken = 'c1caf0c048993a0964703b74ad2f9813';

// require the Twilio module and create a REST client
  }

  validate() {
    this.isValid = true;
    this.valName = '';
    this.valUserName = '';
    this.valPassword = '';
    this.valRePassword = '';
    this.valDob = '';
    this.valGender = '';
    this.valGroup = '';
    this.valContact = '';
    this.valAddress = '';
    this.valDistrict = '';
    this.valDivision = '';
    const name = document.forms['userForm']['name'].value;
    const username = document.forms['userForm']['username'].value;
    const password = document.forms['userForm']['password'].value;
    const repassword = document.forms['userForm']['repeatPassword'].value;
    const dob = document.forms['userForm']['dob'].value;
    const gender = document.forms['userForm']['gender'].value;
    const blood_group = document.forms['userForm']['blood_group'].value;
    const contact_no = document.forms['userForm']['contact_no'].value;
    const email = document.forms['userForm']['email'].value;
    const address = document.forms['userForm']['address'].value;
    const district = document.forms['userForm']['district'].value;
    const division = document.forms['userForm']['division'].value;
    if (name === '') {
      this.valName = 'This is a required field';
      this.isValid = false;
    } if (username === '') {
      this.valUserName = 'This is a required field';
      this.isValid = false;
    } if (password === '') {
      this.valPassword = 'This is a required field';
      this.isValid = false;
    } if (repassword === '') {
      this.valRePassword = 'This is a required field';
      this.isValid = false;
    } if (dob === '') {
      this.valDob = 'This is a required field';
      this.isValid = false;
    } if (gender === '') {
      this.valGender = 'This is a required field';
      this.isValid = false;
    } if (blood_group === '') {
      this.valGroup = 'This is a required field';
      this.isValid = false;
    } if (contact_no === '') {
      this.valContact = 'This is a required field';
      this.isValid = false;
    } if (email === '') {
      this.valEmail = 'This is a required field';
      this.isValid = false;
    } if (address === '') {
      this.valAddress = 'This is a required field';
      this.isValid = false;
    } if (district === '') {
      this.valDistrict = 'This is a required field';
      this.isValid = false;
    } if (division === '') {
      this.valDivision = 'This is a required field';
      this.isValid = false;
    } if (!/^[0-9]+$/.test(contact_no) || contact_no.length !== 10) {
      this.valContact = 'Invalid contact number';
      this.isValid = false;
    } if (password.length < 8) {
      this.valPassword = 'Password must be more than 8 characters';
      this.isValid = false;
    } if (password !== repassword) {
      this.valRePassword = 'Password mismathced';
      this.isValid = false;
    } if (this.isValid === true) {
      return true;
    } else {
      return false;
    }
  }

}
