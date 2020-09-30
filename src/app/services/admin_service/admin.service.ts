import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';

const DB_URL = env.DB_URL;
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  public role$ = new Subject<any>()

  getAllAdmins() {
    return this.http.get<any>(`${DB_URL}/admins`);
  }

  addNewAdmin(body: object) {
    return this.http.post<any>(`${DB_URL}/admins`, body).pipe(tap(() => this.role$.next()));
  }

  updateAdminRole(body: object, adminId: string) {
    return this.http.patch(`${DB_URL}/admins/${adminId}`, body).pipe(tap(() => this.role$.next()));
  }

  deleteAdmin(adminId: string) {
    return this.http.delete(`${DB_URL}/admins/${adminId}`).pipe(tap(() => this.role$.next()));
  }

}
