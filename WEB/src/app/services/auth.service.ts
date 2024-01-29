import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { ENV } from 'src/environments/env';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.loggedIn.next(this.isLoggedIn());
  }

  login(username: string, password: string): Observable<boolean> {
    const credentials = {
      username: username,
      password: password,
    };

    return this.http.post<any>(`${ENV.apiUrl}/auth/signin`, credentials).pipe(
      map((response) => {
        localStorage.setItem('user', response.email);
        localStorage.setItem('user_id', response.id);
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.roles[0]);
        this.loggedIn.next(true);
        return true;
      }),
      catchError((error) => {
        this.loggedIn.next(false);
        return of(false);
      })
    );
  }

  logout(): Observable<boolean> {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.loggedIn.next(false);
    return this.loggedIn.asObservable();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  whatRole(): string {
    return localStorage.getItem('role')!;
  }

  whoAmI(): number {
    return parseInt(localStorage.getItem('user_id')!);
  }
}
