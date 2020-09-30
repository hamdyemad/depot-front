import { Admin } from './../../../../models/admins.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from './../../../../services/auth_service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  userInfo: Admin;
  $(ele) {
    return document.querySelector(ele);
  }
  constructor(private _auth: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUserInfo();
  }


  getUserInfo() {
    this._auth.getUserInfo().subscribe(res => {
      this.userInfo = res[0];
    })
  }
  logOut() {
    this._auth.logOut().then(() => {
      this.toastr.info('you are logged out');
      this.router.navigate(['/']);
    })
  }


  toggleSide(burger) {
    let adminSideNav: HTMLDivElement = this.$('.admin-nav');
    adminSideNav.classList.toggle('slide');
  }

}
