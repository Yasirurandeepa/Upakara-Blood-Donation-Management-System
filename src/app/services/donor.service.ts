import {Inject, Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
import {ajaxPatch} from 'rxjs/observable/dom/AjaxObservable';

@Injectable()
export class DonorService {

  private http: Http;

  constructor(private router: Router, @Inject(Http) http) {
    this.http = http;
  }

  getDonorDetails(data) {       // get selected donor details
    return this.http.post('http://localhost:3000/get_donor', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})})).map(res => res.json());
  }

  updateDonorDetails(data) {         // update donor details
    return this.http.patch('http://localhost:3000/update_donor_details', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})}))
      .map(res => res.json());
  }

  delete_donor_profile(data) {         // delete donor details
    return this.http.post('http://localhost:3000/remove_donor_profile', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})}))
      .map(res => res.json());
  }

}
