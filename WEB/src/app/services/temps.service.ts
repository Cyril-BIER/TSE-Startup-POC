import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { ENV } from 'src/environments/env';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TempsService {
  url = `${ENV.apiUrl}/imputation`;
  constructor(private authService: AuthService, private http: HttpClient) {}

  postTemps(data: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.authService.getToken()}`);

    const httpOptions = {
      headers: headers,
    };
    return this.http.post<any>(this.url, data, httpOptions).pipe(
      map((response) => {
        return;
      }),
      catchError((error) => {
        return of(false);
      })
    );
  }
}
