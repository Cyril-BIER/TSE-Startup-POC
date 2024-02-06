import {catchError, map, Observable, of, throwError} from 'rxjs';
import { ENV } from '../../environments/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
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
  getAttachedUsers() {
    return this.http
      .get<any>(`${ENV.apiUrl}/manager/attachedUser`, { headers: this.headers })
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

  getProjects() {
    return this.http
      .get<any>(`${ENV.apiUrl}/manager/projects`, { headers: this.headers })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          console.error('Error fetching projects :', error);
          return throwError(false);
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
          console.error('Error fetching imputation:', error);
          return throwError(false);
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
          console.error('Error fetching imputation:', error);
          return throwError(false);
        })
      );
  }
  putImputationUser(imputationID: number, duration: number, userId: string): Observable<boolean> {
    const intHours = Math.floor(duration);
    const minutes = Math.round((duration - intHours) * 60);

    const credentials = {
      imputationId: imputationID,
      duration: `PT${intHours}H${minutes}M`,
    };

    return this.http
      .put<any>(`${ENV.apiUrl}/manager/imputation/${userId}`, credentials, {
        headers: this.headers,
      })
      .pipe(
        map((response) => {
          return true;
        }),
        catchError((error) => {
          return of(false);
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
          console.error('Error fetching imputation:', error);
          return throwError(false);
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
          console.error('Error fetching imputation:', error);
          return throwError(false);
        })
      );
  }

}
