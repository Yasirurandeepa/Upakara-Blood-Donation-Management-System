import {Inject, Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {ajaxPatch} from 'rxjs/observable/dom/AjaxObservable';

@Injectable()
export class SignupService {

  public isSignupClicked: boolean;
  private http: Http;

  constructor(@Inject(Http) http) {
    this.http = http;
    this.isSignupClicked = false;
  }

  sendSms() {       // send sms to the mobile for finish registration process
    return this.http.get('http://localhost:3000/send_sms',
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})})).map(res => res.json());
  }

}
