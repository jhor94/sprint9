import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../interfaces/user';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { ResponseAccess } from '../../interfaces/response-access';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "http://localhost:3000"
  httpClient = inject(HttpClient);
  constructor() { }


  register(user:User): Observable<ResponseAccess> {
    return this.httpClient.post<ResponseAccess>(`${this.apiUrl}/auth/register`, user)
  }


  login(email: string, password:string): Observable<ResponseAccess> {
    return this.httpClient.post<ResponseAccess>(`${this.apiUrl}/auth/login`, {email, password}, {withCredentials:true})
  }


  IsLogin(){
    return !!localStorage.getItem('token'); // valida token para hacer hacer login
  }

  removeLogin(){
    return localStorage.removeItem('token'); //quita toket para hacer log out
  }

}
