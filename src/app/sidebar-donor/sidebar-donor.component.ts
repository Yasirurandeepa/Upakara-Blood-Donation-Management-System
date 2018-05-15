import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: 'user', title: 'User Profile',  icon:'pe-7s-user', class: '' },
  { path: 'notifications', title: 'Notifications',  icon:'pe-7s-bell', class: '' },
];

@Component({
  selector: 'app-sidebar-donor',
  templateUrl: './sidebar-donor.component.html',
  styleUrls: ['./sidebar-donor.component.css']
})
export class SidebarDonorComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  logout(){
    swal({
      // title:
      text: "Are you sure want to logout from the account?",
      icon: "warning",
      buttons: ['Cancel', 'Ok'],
      dangerMode: false,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("You have successfully logout from the account!", {
            icon: "success",
          });
          sessionStorage.removeItem('isLoggedIn');                //remove session details
          sessionStorage.removeItem('Type');
          sessionStorage.removeItem('currentUser');
          window.location.reload();
        } else {
          swal("Your have cancelled!");
        }
      });
  }

}
