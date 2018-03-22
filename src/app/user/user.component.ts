import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {SeekerService} from "../services/seeker.service";
import {LoginService} from "../services/login.service";
import {DonorService} from "../services/donor.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  username: string;
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
  constructor(private seekerService: SeekerService, private donorService: DonorService, private loginService: LoginService) {
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
    this.getSeeker();
  }


  getSeeker() {
    // const username = this.login.userName;               ///////////// session username   ///////////////////
    const username = sessionStorage.getItem('currentUser');
    if(sessionStorage.getItem('Type')==='Seeker'){
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
      const username = sessionStorage.getItem('currentUser');
      const gender = document.forms['userForm']['gender'].value;
      const blood_group = document.forms['userForm']['blood_group'].value;
      const contact_no = document.forms['userForm']['contact_no'].value;
      const email = document.forms['userForm']['email'].value;
      const nic = document.forms['userForm']['nic'].value;

      const conf = confirm('Do you want to accept this request?');
      if (conf === true) {
        this.seeker.updateSeekerDetails({
          username: username,
          gender: gender,
          blood_group: blood_group,
          contact_no: contact_no,
          email: email,
          nic: nic
        }).subscribe(
          result => {
            this.getSeeker();
          }, error => {
            console.log(error);
          }
        );
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

}
