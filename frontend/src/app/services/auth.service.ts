import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient, private _router: Router) {}

  loginUser(userInfo): Observable<any> {
    return this._http.post<any>(`/api/loginAuth`, userInfo);
  }

  registerUser(userInfo): Observable<any> {
    return this._http.post<any>(`/api/registerAuth`, userInfo);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this._router.navigate(['/home']);
  }
}
