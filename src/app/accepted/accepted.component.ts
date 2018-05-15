import { Component, OnInit } from '@angular/core';
import {SeekerService} from "../services/seeker.service";
import {DonorService} from "../services/donor.service";
import {ReportService} from "../services/report.service";
import swal from 'sweetalert';
import {RateService} from "../services/rate.service";

@Component({
  selector: 'app-accepted',
  templateUrl: './accepted.component.html',
  styleUrls: ['./accepted.component.css']
})

export class AcceptedComponent implements OnInit {

  acceptedDonors: any[];
  donorOverview: any[];

  constructor(private seeker: SeekerService, private report: ReportService, private rate: RateService) { }

  ngOnInit() {
    this.showAcceptedDonors();
    this.getDonorOverview();
  }

  showAcceptedDonors(){
    const seeker_username = sessionStorage.getItem('currentUser');
    this.seeker.getAcceptedDonors({
      seeker_username: seeker_username
    }).subscribe(
      donorDetails => {
        this.acceptedDonors = donorDetails;
      },
      error => {
        console.log(error);
      }
    );
  }

  getDonorOverview(){
    this.rate.getDonorRates().subscribe(
      donorRates => {
        this.donorOverview = donorRates;
      },
      error => {
        console.log(error);
      }
    );
  }

  reportDonor(donor_username){
    swal({
      // title:
      text: "Are you sure want to report this user?",
      icon: "warning",
      buttons: ['Cancel', 'Ok'],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("You have successfully reported the user!", {
            icon: "success",
          });
          this.report.reportDonor({
            donor_username: donor_username,
            seeker_username: sessionStorage.getItem('currentUser')
          }).subscribe(
            result => {
              // this.getUser();
            }, error => {
              swal("", "Already reported this user!", "error")
            }
          );
        } else {
          swal("Your have cancelled!");
        }
      });
    // const conf = confirm('Do you want to report this user?');
    // if (conf === true) {
    //
    // }
  }

  star5(donor_username){
    swal({
      text: "Do you want to rate this user as Excellent?",
      buttons: ['Cancel', 'Ok'],
      dangerMode: false,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("You have successfully rated this user as Excellent!", {
            icon: "success",
          });
          this.rate.rateDonor({
            donor_username: donor_username,
            seeker_username: sessionStorage.getItem('currentUser'),
            rate_value: 5
          }).subscribe(
            result => {
              this.showAcceptedDonors();                                        //refresh the rates
            }, error => {
              swal("", "Already reported this user!", "error")
            }
          );
        } else {
          swal("Your have cancelled!");
        }
      });
  }

  star4(donor_username){
    swal({
      text: "Do you want to rate this user as Very Good?",
      buttons: ['Cancel', 'Ok'],
      dangerMode: false,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("You have successfully rated this user as Very Good!", {
            icon: "success",
          });
          this.rate.rateDonor({
            donor_username: donor_username,
            seeker_username: sessionStorage.getItem('currentUser'),
            rate_value: 4
          }).subscribe(
            result => {
              this.showAcceptedDonors();
            }, error => {
              swal("", "Already reported this user!", "error")
            }
          );
        } else {
          swal("Your have cancelled!");
        }
      });
  }

  star3(donor_username){
    swal({
      text: "Do you want to rate this user as Normal?",
      buttons: ['Cancel', 'Ok'],
      dangerMode: false,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("You have successfully rated this user as Normal!", {
            icon: "success",
          });
          this.rate.rateDonor({
            donor_username: donor_username,
            seeker_username: sessionStorage.getItem('currentUser'),
            rate_value: 3
          }).subscribe(
            result => {
              this.showAcceptedDonors();
            }, error => {
              swal("", "Already reported this user!", "error")
            }
          );
        } else {
          swal("Your have cancelled!");
        }
      });
  }

  star2(donor_username){
    swal({
      text: "Do you want to rate this user as Low?",
      buttons: ['Cancel', 'Ok'],
      dangerMode: false,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("You have successfully rated this user as Low!", {
            icon: "success",
          });
          this.rate.rateDonor({
            donor_username: donor_username,
            seeker_username: sessionStorage.getItem('currentUser'),
            rate_value: 2
          }).subscribe(
            result => {
              this.showAcceptedDonors();
            }, error => {
              swal("", "Already reported this user!", "error")
            }
          );
        } else {
          swal("Your have cancelled!");
        }
      });
  }

  star1(donor_username){
    swal({
      text: "Do you want to rate this user as Untrusted?",
      buttons: ['Cancel', 'Ok'],
      dangerMode: false,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("You have successfully rated this user as Untrusted!", {
            icon: "success",
          });
          this.rate.rateDonor({
            donor_username: donor_username,
            seeker_username: sessionStorage.getItem('currentUser'),
            rate_value: 1
          }).subscribe(
            result => {
              this.showAcceptedDonors();
            }, error => {
              swal("", "Already reported this user!", "error")
            }
          );
        } else {
          swal("Your have cancelled!");
        }
      });
  }
}
