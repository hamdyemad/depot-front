import { AuthService } from './../../../../services/auth_service/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Admin } from './../../../../models/admins.model';
import { AdminService } from './../../../../services/admin_service/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {

  adminForm: FormGroup;
  admins: Admin[]
  constructor(private adminService: AdminService, private fb: FormBuilder) { }

  ngOnInit(): void {
    // fire get all admins FN
    this.getAllAdmins();

    this.makeAdminForm();
    this.adminService.role$.subscribe(() => {
      this.getAllAdmins();
    })
  }

  makeAdminForm() {
    this.adminForm = this.fb.group({
      userName: [''],
      email: [''],
      password: [''],
      role: ['']
    })
  }

  onAddAdmin() {
    const formValue = this.adminForm.value;
    console.log(formValue);
    this.adminService.addNewAdmin(formValue).subscribe(res => {
      console.log(res);
    })
  }

  toggleForm(form: HTMLFormElement) {
    form.classList.toggle('activeForm')
  }
  stopProp(e: Event) {
    e.stopPropagation();
  }

  getAllAdmins = () => {
    this.adminService.getAllAdmins().subscribe(res => {
      this.admins = res;
      console.log(res);
    })
  }

  // Toggle Drop Down of delete and edit button
  toggleDropDown(dropDown: HTMLDivElement, e: Event) {
    this.toggleClass(dropDown, e, 'activeDropDown');
  }

  // Toggle Drop Down of status
  toggleStatus(statusBody: HTMLDivElement, e: Event, adminId: string) {
    this.toggleClass(statusBody, e, 'activeStatus');
    statusBody.childNodes.forEach((ele: HTMLDivElement) => {
      ele.onclick = () => {
        console.log(ele.textContent)
        const body = {
          role: ele.textContent
        }
        this.adminService.updateAdminRole(body, adminId).subscribe(res => {
          console.log(res);
        })
      }
    })
  }

  toggleClass(div: HTMLDivElement, e: Event, classEle: string) {
    div.classList.toggle(classEle)
    e.stopPropagation();
    addEventListener('click', (e) => {
      div.classList.remove(classEle)
    })
  }


  deleteAdmin(adminId: string) {
    this.adminService.deleteAdmin(adminId).subscribe(res => {
      console.log(res);
    })
  }

}
