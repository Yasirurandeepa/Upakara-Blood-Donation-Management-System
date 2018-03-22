import {Inject, Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
import {ajaxPatch} from 'rxjs/observable/dom/AjaxObservable';


@Injectable()
export class UserService {
  private http: Http;
  public user_id;
  public isSeeker: boolean;

  constructor(private router: Router, @Inject(Http) http) {
    this.http = http;
    this.isSeeker = false;
  }



  addDonor(data) {          // insert donor details
    return this.http.post('http://localhost:3000/add_new_donor', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})}))
      .map(res => res.json());
  }

  addUserDonor(data){       // insert donor details for user table
    return this.http.post('http://localhost:3000/add_new_user_donor', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})}))
      .map(res => res.json());
  }

  addSeeker(data) {         // insert seeker details
    return this.http.post('http://localhost:3000/add_new_seeker', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})}))
      .map(res => res.json());
  }

  addUserSeeker(data){      // insert seeker details for user table
    return this.http.post('http://localhost:3000/add_new_user_seeker', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})}))
      .map(res => res.json());
  }

  searchUser(data) {       // get selected user details
    return this.http.post('http://localhost:3000/search_user', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})})).map(res => res.json());
  }

}



