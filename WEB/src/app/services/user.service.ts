import {catchError, map, Observable, of, throwError} from "rxjs";
import {ENV} from "../../environments/env";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userCreated:boolean = false;
  managerCreater:boolean = false;

  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    // Initialize headers with authorization token
    const token = localStorage.getItem('token');
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
  createUser(email: string, firstName: string, lastName: string, password: string) {
    const credentials = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
    };
    return this.http.post<any>(`${ENV.apiUrl}/auth/registerUser`, credentials, { headers: this.headers }).pipe(
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

  createUManager(email: string, password: string) {
    const credentials = {
      email: email,
      password: password,
    };
    return this.http.post<any>(`${ENV.apiUrl}/auth/registerManager`, credentials).pipe(
      map((response) => {
        localStorage.setItem('user', response.email);
        localStorage.setItem('user_id', response.id);
        localStorage.setItem('role', response.roles[0]);
        this.managerCreater=true;
        return true;
      }),
      catchError((error) => {
        this.managerCreater=false;
        return of(false);
      })
    );
  }
  getEmail(): string {
    return localStorage.getItem('user')!;
  }

}
