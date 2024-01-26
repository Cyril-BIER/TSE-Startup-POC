import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loggedIn.next(this.isLoggedIn());
  }

  login(username: string, password: string): Observable<boolean> {
    localStorage.setItem('user', 'Mohamed');
    localStorage.setItem('token', 'Mohamed');
    this.loggedIn.next(true);
    return this.loggedIn.asObservable();
  }

  logout(): Observable<boolean> {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    return this.loggedIn.asObservable();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
