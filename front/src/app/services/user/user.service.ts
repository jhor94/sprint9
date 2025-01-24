import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private backUrl: string;
  private apiUrl: string;
  
  constructor (private httpCliente: HttpClient) { 
    this.backUrl = environment.endpoint;
    this.apiUrl = '/users'
  }

  getUsers(): Observable<User[]>{
    return this.httpCliente.get<{code:number, msg:string, data:User[]}>(`${this.backUrl}${this.apiUrl}`, {withCredentials:true})
    .pipe(
      map(response => response.data)
    )
  }

  //falta getuser(id)

  deleteUser(id: number):Observable<void>{
    return this.httpCliente.delete<void>(`${this.backUrl}${this.apiUrl}${id}`)
  }

  saveUsers(persona: User): Observable<void>{
    return this.httpCliente.post<void>(`${this.backUrl}${this.apiUrl}`, persona)
  }

  updateUser(id:number, persona:User):Observable<void>{
    return this.httpCliente.put<void>(`${this.backUrl}${this.apiUrl}${id}`, persona)
  }
}
