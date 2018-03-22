import {Inject, Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
import {ajaxPatch} from 'rxjs/observable/dom/AjaxObservable';

@Injectable()
export class NotificationService {
  private http: Http;

  constructor(private router: Router, @Inject(Http) http) {
    this.http = http;
  }

  sendDonorNotification(data) {          // send insert donor notifications
    return this.http.post('http://localhost:3000/send_donor_notification', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})}))
      .map(res => res.json());
  }

  queryDonorNotifications(data) {        // get notifications
    return this.http.post('http://localhost:3000/get_donor_notifications', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})}))
      .map(res => res.json());
  }

  updateDonorNotification(data) {         // update donor details
    return this.http.patch('http://localhost:3000/update_donor_notification', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})}))
      .map(res => res.json());
  }

  delete_donor_notification(data) {         // delete delete details
    return this.http.post('http://localhost:3000/remove_donor_notification', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})}))
      .map(res => res.json());
  }

}
