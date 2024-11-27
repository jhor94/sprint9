import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private backUrl:string
  private apiUrl:string

  constructor(private http: HttpClient) { 
    this.backUrl = environment.endpoint;
    this.apiUrl = '/books/';
  }

  searchtBooks(searchQuery:string): Observable <any[]>{
    const params = new HttpParams().set('search', searchQuery)

    return this.http.get<any[]>(`${this.backUrl}${this.apiUrl}/search`, {params})
   }
}
