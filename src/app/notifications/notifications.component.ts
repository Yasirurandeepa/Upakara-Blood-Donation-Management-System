import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../services/notification.service";

declare var $:any;

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  donor_notifications: any[];
  private notification: NotificationService;

  constructor(private notificationService: NotificationService) {
    this.notification = notificationService;
  }

  ngOnInit() {
    this.show_donor_notifications();
  }
  show_donor_notifications() {
    const donor_username = sessionStorage.getItem('currentUser');
    this.notification.queryDonorNotifications({
      donor_username: donor_username
    }).subscribe(
      donor_notifications => {
        this.donor_notifications = donor_notifications;
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteDonorNotification(donor_username, seeker_username) {
    swal({
      // title:
      text: "Are you sure want to reject this request?",
      buttons: ['Cancel', 'Ok'],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("You have successfully deleted the request!", {
            icon: "success",
          });
          this.notification.delete_donor_notification({
            donor_username: donor_username,
            seeker_username: seeker_username                //////////// session username /////////////
          }).subscribe(
            result => {
              this.show_donor_notifications();
            },
            error => {
              // swal("", "Already requested from this user!", "error")
            }
          );
        } else {
          swal("Your have cancelled!");
        }
      });
  }

  updateDonorNotification(donor_username, seeker_username) {
    swal({
      // title:
      text: "Are you sure want to accept this request?",
      buttons: ['Cancel', 'Ok'],
      dangerMode: false,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("You have successfully accepted the request!", {
            icon: "success",
          });
          this.notification.updateDonorNotification({
            donor_username: donor_username,
            seeker_username: seeker_username                 //////////// session username /////////////
          }).subscribe(
            result => {
              this.show_donor_notifications();
            },
            error => {
              // swal("", "Already requested from this user!", "error")
            }
          );
        } else {
          swal("Your have cancelled!");
        }
      });
  }

}
