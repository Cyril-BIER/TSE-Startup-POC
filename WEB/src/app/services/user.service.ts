import { catchError, map, Observable, of, throwError } from 'rxjs';
import { ENV } from '../../environments/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private headers: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) {
    // Initialize headers with authorization token
    const token = this.authService.getToken();
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getProjets() {
    return this.http
      .get<any>(`${ENV.apiUrl}/user/projects`, { headers: this.headers })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return error;
        })
      );
  }

  getImputation() {
    return this.http
      .get<any>(`${ENV.apiUrl}/user/imputation`, { headers: this.headers })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return error;
        })
      );
  }

  postImputation(data: any): Observable<any> {
    const intHours = Math.floor(data.duration);
    const minutes = Math.round((data.duration - intHours) * 60);

    const body = {
      projectId: data.projectId,
      date: data.date,
      duration: `PT${intHours}H${minutes}M`,
    };

    return this.http
      .post<any>(`${ENV.apiUrl}/user/imputation`, body, {
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

  putImputation(imputationID: number, duration: number): Observable<boolean> {
    const intHours = Math.floor(duration);
    const minutes = Math.round((duration - intHours) * 60);

    const credentials = {
      imputationId: imputationID,
      duration: `PT${intHours}H${minutes}M`,
    };

    return this.http
      .put<any>(`${ENV.apiUrl}/user/imputation`, credentials, {
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

  createMonthReport() {
    return this.http
      .get<any>(`${ENV.apiUrl}/user/createMonthReport`, {
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

  getMonthReport() {
    return this.http
      .get<any>(`${ENV.apiUrl}/user/monthReport`, {
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
}
