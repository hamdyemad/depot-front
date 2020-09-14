import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-side',
  templateUrl: './admin-side.component.html',
  styleUrls: ['./admin-side.component.scss']
})
export class AdminSideComponent implements OnInit {

  isActive: Boolean
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isActive = this.router.isActive('/admin/products', true);
  }

}
