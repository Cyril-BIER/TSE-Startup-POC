import {catchError, map, throwError} from 'rxjs';
import { ENV } from '../../environments/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    // Initialize headers with authorization token
    const token = localStorage.getItem('token');
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  createUser(
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
      .post<any>(`${ENV.apiUrl}/manager/registerUser`, credentials, {
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

  getAttachedUsers() {
    return this.http
      .get<any>(`${ENV.apiUrl}/manager/attachedUser`, { headers: this.headers })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return error;
        })
      );
  }

  getProjects() {
    return this.http
      .get<any>(`${ENV.apiUrl}/manager/projects`, { headers: this.headers })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return error;
        })
      );
  }

  postProject(data: any) {
    return this.http
      .post<any>(`${ENV.apiUrl}/manager/createProject`, data, {
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

  getImputationUser(userId: string) {
    return this.http
      .get<any>(`${ENV.apiUrl}/manager/imputation/${userId}`, { headers: this.headers })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return error;
        })
      );
  }

  createMonthReportUser(userId: string) {
    return this.http
      .get<any>(`${ENV.apiUrl}/manager/createMonthReport/${userId}`, {
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

  getMonthReportUser(userId: string) {
    return this.http
      .get<any>(`${ENV.apiUrl}/manager/monthReport/${userId}`, {
        headers: this.headers,
      })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return error
        })
      );
  }
}
