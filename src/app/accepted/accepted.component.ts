import { Component, OnInit } from '@angular/core';
import {SeekerService} from "../services/seeker.service";

@Component({
  selector: 'app-accepted',
  templateUrl: './accepted.component.html',
  styleUrls: ['./accepted.component.css']
})
export class AcceptedComponent implements OnInit {

  acceptedDonors: any[];

  constructor(private seeker: SeekerService) { }

  ngOnInit() {
    this.showAcceptedDonors();
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
}
