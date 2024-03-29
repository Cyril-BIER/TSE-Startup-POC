import { catchError, map, throwError } from 'rxjs';
import { ENV } from '../../environments/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private headers: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) {
    // Initialize headers with authorization token
    const token = this.authService.getToken();
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
          return true;
        }),
        catchError((error) => {
          return error;
        })
      );
  }

  getAllManagers() {
    return this.http
      .get<any>(`${ENV.apiUrl}/admin/getAllManagers`, {
        headers: this.headers,
      })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return error;
        })
      );
  }

  getAllUsers() {
    return this.http
      .get<any>(`${ENV.apiUrl}/admin/getAllUsers`, {
        headers: this.headers,
      })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return error;
        })
      );
  }

  userToManager(userId: string) {
    return this.http
      .get<any>(`${ENV.apiUrl}/admin/userToManager/${userId}`, {
        headers: this.headers,
      })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          console.error('Error fetching imputation:', error);
          return throwError(false);
        })
      );
  }

  userToAdmin(userId: string) {
    return this.http
      .get<any>(`${ENV.apiUrl}/admin/userToAdmin/${userId}`, {
        headers: this.headers,
      })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          console.error('Error fetching imputation:', error);
          return throwError(false);
        })
      );
  }

  changeManager(userId: string, managerId: string) {
    return this.http
      .get<any>(`${ENV.apiUrl}/admin/changeManager/${userId}/${managerId}`, {
        headers: this.headers,
      })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          console.error('Error fetching imputation:', error);
          return throwError(false);
        })
      );
  }
}
