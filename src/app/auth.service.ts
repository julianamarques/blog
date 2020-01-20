import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import { tap, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL = 'http://localhost:8000/';
  authURL = this.baseURL + 'auth/';

  constructor(private http: HttpClient, private router: Router) { }

  private setSession(authResult: any) {
    const token = authResult.token;
    const payload = jwtDecode(token) as JWTPayload;
    const expiresAt = moment.unix(payload.exp);

    localStorage.setItem('token', authResult.token);
    localStorage.setItem('user_id', payload.user_id.toString());
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  get token(): string {
    return localStorage.getItem('token');
  }

  login(userData: any): Observable<any> {
    return this.http.post<any>(
      this.authURL.concat('login/'), userData, {headers: ({'Content-Type': 'application/json'})}).pipe(
      tap(response => this.setSession(response)),
      shareReplay(),
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('expires_at');
    this.router.navigate(['']);
  }

  refreshToken() {
    if (moment().isBetween(this.getExpiration().subtract(1, 'days'), this.getExpiration())) {
      return this.http.post(
        this.authURL.concat('refresh-token/'),
        { token: this.token }
      ).pipe(
        tap(response => this.setSession(response)),
        shareReplay(),
      ).subscribe();
    }
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);

    return moment(expiresAt);
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration()) || this.token != null;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getAuthUser() {
    return this.http.get<any>(
      this.baseURL.concat('users/').concat(localStorage.getItem('user_id')).concat('/'),
      {headers: ({'Content-Type': 'application/json', Authorization:  'JWT '.concat(this.token)})});
  }
}

interface JWTPayload {
  user_id: number;
  username: string;
  email: string;
  exp: number;
}
