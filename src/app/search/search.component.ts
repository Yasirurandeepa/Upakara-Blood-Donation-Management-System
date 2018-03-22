import { Component, OnInit } from '@angular/core';
import {SeekerService} from "../services/seeker.service";
import {NotificationService} from "../services/notification.service";
import {LoginService} from "../services/login.service";

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
    this.notification.sendDonorNotification({
      donor_username: donor_username,
      seeker_username: this.login.userName                    //////////// session username /////////////
    }).subscribe(
      result => {
        console.log(result);
      },
      error => {
        alert("Already Requested")
      }
    );
  }

  // getHalls() {
  //   this.hall.queryHalls().subscribe(
  //     halls => {
  //       this.halls = halls;
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }
  //
  // deleteHall(id) {
  //   const conf = confirm('Do you really want me to delete this record?');
  //   if (conf === true) {
  //     this.hall.delete_hall({
  //       h_no: id,
  //     }).subscribe(
  //       result => {
  //         this.getHalls();
  //       }, error => {
  //         console.log(error);
  //       }
  //     );
  //   }
  // }
}
