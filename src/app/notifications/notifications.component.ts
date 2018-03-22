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
    const conf = confirm('Do you want to reject this request?');
    if (conf === true) {
      this.notification.delete_donor_notification({
        donor_username: donor_username,
        seeker_username: seeker_username
      }).subscribe(
        result => {
          this.show_donor_notifications();
        }, error => {
          console.log(error);
        }
      );
    }
  }

  updateDonorNotification(donor_username, seeker_username) {
    const conf = confirm('Do you want to accept this request?');
    if (conf === true) {
      this.notification.updateDonorNotification({
        donor_username: donor_username,
        seeker_username: seeker_username
      }).subscribe(
        result => {
          this.show_donor_notifications();
        }, error => {
          console.log(error);
        }
      );
    }
  }

}
