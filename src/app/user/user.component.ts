import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {SeekerService} from "../services/seeker.service";
import {LoginService} from "../services/login.service";
import {DonorService} from "../services/donor.service";
import * as EmailValidator from 'email-validator';
import {Router} from "@angular/router";
import swal from 'sweetalert';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  username: string;
  userType: string;
  email: string;
  contact_no: string;
  gender: string;
  nic: string;
  blood_group: string;

  isValid: boolean;
  valDob: string;
  valGender: string;
  valGroup: string;
  valContact: string;
  valEmail: string;
  valAddress: string;
  valDistrict: string;
  valDivision: string;
  valNIC: string;

  private currentUser: any;
  private seeker: SeekerService;
  private donor: DonorService;
  private login: LoginService;
  constructor(private seekerService: SeekerService, private donorService: DonorService, private loginService: LoginService, private router: Router) {
    this.seeker = seekerService;
    this.donor = donorService;
    this.login = loginService;
    this.currentUser = [
      this.username,
      this.email,
      this.nic,
      this.contact_no,
      this.blood_group,
      this.gender
    ];
  }

  ngOnInit() {
    this.getUser();
  }


  getUser() {
    // const username = this.login.js.userName;               ///////////// session username   ///////////////////
    const username = sessionStorage.getItem('currentUser');
    if(sessionStorage.getItem('Type')==='Seeker'){
      this.userType = 'Seeker';
      this.seeker.getSeekerDetails({
        username: username,
      }).subscribe(
        seekerDetails => {
          this.currentUser = seekerDetails[0];
        },
        error => {
          console.log(error);
        }
      );
    }else if(sessionStorage.getItem('Type')==='Donor'){
      this.userType = 'Donor';
      this.donor.getDonorDetails({
        username: username,
      }).subscribe(
        donorDetails => {
          this.currentUser = donorDetails[0];
        },
        error => {
          console.log(error);
        }
      );
    }

  }

  updateDetails() {
    if(this.validate()){
      if(sessionStorage.getItem('Type')==='Seeker'){
        const username = sessionStorage.getItem('currentUser');
        const gender = document.forms['userForm']['gender'].value;
        const blood_group = document.forms['userForm']['blood_group'].value;
        const contact_no = document.forms['userForm']['contact_no'].value;
        const email = document.forms['userForm']['email'].value;
        const nic = document.forms['userForm']['nic'].value;

        swal({
          // title:
          text: "Are you sure want to update profile details?",
          buttons: ['Cancel', 'Ok'],
          dangerMode: false,
        })
          .then((willDelete) => {
            if (willDelete) {
              swal("You have successfully updated your profile details!", {
                icon: "success",
              });
              this.seeker.updateSeekerDetails({
                username: username,
                gender: gender,
                blood_group: blood_group,
                contact_no: contact_no,
                email: email,
                nic: nic
              }).subscribe(
                result => {
                  this.getUser();
                }, error => {
                  console.log(error);
                }
              );
            } else {
              swal("Your have cancelled!");
            }
          });
      }
      else if(sessionStorage.getItem('Type')==='Donor'){
        const username = sessionStorage.getItem('currentUser');
        const gender = document.forms['userForm']['gender'].value;
        const blood_group = document.forms['userForm']['blood_group'].value;
        const contact_no = document.forms['userForm']['contact_no'].value;
        const email = document.forms['userForm']['email'].value;
        const nic = document.forms['userForm']['nic'].value;

        swal({
          // title:
          text: "Are you sure want to update profile details?",
          buttons: ['Cancel', 'Ok'],
          dangerMode: false,
        })
          .then((willDelete) => {
            if (willDelete) {
              swal("You have successfully updated your profile details!", {
                icon: "success",
              });
              this.donor.updateDonorDetails({
                username: username,
                gender: gender,
                blood_group: blood_group,
                contact_no: contact_no,
                email: email,
                nic: nic
              }).subscribe(
                result => {
                  this.getUser();
                }, error => {
                  console.log(error);
                }
              );
            } else {
              swal("Your have cancelled!");
            }
          });
      }
    }
  }

  validate() {
    this.isValid = true;
    this.valGender = '';
    this.valGroup = '';
    this.valContact = '';
    this.valEmail = '';
    this.valNIC = '';

    const gender = document.forms['userForm']['gender'].value;
    const blood_group = document.forms['userForm']['blood_group'].value;
    const contact_no = document.forms['userForm']['contact_no'].value;
    const email = document.forms['userForm']['email'].value;
    const nic = document.forms['userForm']['nic'].value;

    if (gender === '') {
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
    } else if(!EmailValidator.validate(email)){               //check valid email address
      this.valEmail = "invalid email";
      this.isValid = false;
    } if (!/^[0-9]+$/.test(contact_no) || contact_no.length !== 10) {
      this.valContact = 'Invalid contact number';
      this.isValid = false;
    } if(nic===''){
      this.valNIC = "This is required field";
      this.isValid = false;
    } else if(nic.length!=10 || (nic.charAt(nic.length-1)!='v' && nic.charAt(nic.length-1)!='V') || !/^[0-9]+$/.test(nic.substring(0,nic.length-1))) {     //check valid NIC
      this.valNIC = "Invalid NIC";
      this.isValid = false;
    } if (this.isValid === true) {
      return true;
    } else {
      return false;
    }
  }

  deleteProfile() {
    swal({
      // title:
      text: "Are you sure want to delete your profile?",
      buttons: ['Cancel', 'Ok'],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("You have successfully deleted your profile!", {
            icon: "success",
          });
          if(sessionStorage.getItem('Type')==='Donor'){
            this.donor.delete_donor_profile({
              username: sessionStorage.getItem('currentUser')
            }).subscribe(
              result => {
                sessionStorage.removeItem('isLoggedIn');                //remove session details
                sessionStorage.removeItem('Type');
                sessionStorage.removeItem('currentUser');
                window.location.reload();
              }, error => {
                console.log(error);
              }
            );
          }
          else if(sessionStorage.getItem('Type')==='Seeker'){
            this.seeker.delete_seeker_profile({
              username: sessionStorage.getItem('currentUser')
            }).subscribe(
              result => {
                sessionStorage.removeItem('isLoggedIn');                //remove session details
                sessionStorage.removeItem('Type');
                sessionStorage.removeItem('currentUser');
                window.location.reload();
              }, error => {
                console.log(error);
              }
            );
          }
        } else {
          swal("Your have cancelled!");
        }
      });
  }

}
