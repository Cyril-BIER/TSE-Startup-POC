import { catchError, map, throwError } from 'rxjs';
import { ENV } from '../../environments/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  userCreated: boolean = false;

  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    // Initialize headers with authorization token
    const token = localStorage.getItem('token');
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  createManager(
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ) {
    const credentials = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
    };
    return this.http
      .post<any>(`${ENV.apiUrl}/admin/registerManager`, credentials, {
        headers: this.headers,
      })
      .pipe(
        map((response) => {
          this.userCreated = true;
          return true;
        }),
        catchError((error) => {
          console.error('Error creating user:', error);
          this.userCreated = false;
          return throwError(false);
        })
      );
  }

  getAllManagers() {
    return this.http
      .get<any>(`${ENV.apiUrl}/admin/getAllManagers`, { headers: this.headers })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          console.error('Error fetching users :', error);
          return throwError(false);
        })
      );
  }
}
