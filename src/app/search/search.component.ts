import { Component, OnInit } from '@angular/core';
import {SeekerService} from "../services/seeker.service";
import {NotificationService} from "../services/notification.service";
import {LoginService} from "../services/login.service";
import swal from 'sweetalert';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  username: string;
  email: string;

  donors: any[];
  private seeker: SeekerService;
  private notification: NotificationService;
  private login: LoginService;

  constructor(private seekerService: SeekerService, private notificationService: NotificationService, private loginService: LoginService) {
    this.seeker = seekerService;
    this.notification = notificationService;
    this.login = loginService;
  }

  ngOnInit() {
    this.searchDonors();
  }

  searchDonors() {
    const blood_group = document.forms['searchForm']['blood_group'].value;
    const district = document.forms['searchForm']['district'].value;
    this.seeker.searchDonors({
      blood_group: blood_group,
      district: district,
    }).subscribe(
      donorDetails => {
        this.donors = donorDetails;
      },
      error => {
        console.log(error);
      }
    );
  }

  request_donor(donor_username) {
    swal({
      // title:
      text: "Are you sure want to request from this user?",
      buttons: ['Cancel', 'Ok'],
      dangerMode: false,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("You have successfully request from this user!", {
            icon: "success",
          });
          this.notification.sendDonorNotification({
            donor_username: donor_username,
            seeker_username: this.login.userName                    //////////// session username /////////////
          }).subscribe(
            result => {
            },
            error => {
              swal("", "Already requested from this user!", "error")
            }
          );
        } else {
          swal("Your have cancelled!");
        }
      });
  }

}
