import {catchError, map, Observable, of, throwError} from "rxjs";
import {ENV} from "../../environments/env";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    // Initialize headers with authorization token
    const token = localStorage.getItem('token');
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getProjets() {
    return this.http.get<any>(`${ENV.apiUrl}/api/user/projects`, {headers: this.headers}).pipe(
      map((response) => {
        return true;
      }),
      catchError((error) => {
        console.error('Error fetching projets:', error);
        return throwError(false);
      })
    );
  }

  getImputation() {
    return this.http.get<any>(`${ENV.apiUrl}/user/imputation`, {headers: this.headers}).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        console.error('Error fetching imputation:', error);
        return throwError(false);
      })
    );
  }

  putImputation(imputationID : number, duration: number): Observable<boolean> {
    const intHours = Math.floor(duration)
    const minutes = Math.round((duration - intHours) * 60)

    const credentials = {
      imputationId: imputationID,
      duration: `PT${intHours}H${minutes}M`
    };

    return this.http.put<any>(`${ENV.apiUrl}/user/imputation`, credentials, {headers: this.headers}).pipe(
      map((response) => {
        return true;
      }),
      catchError((error) => {
        return of(false);
      })
    );
  }

  createMonthReport() {
    return this.http.get<any>(`${ENV.apiUrl}/user/createMonthReport`, {headers: this.headers}).pipe(
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
