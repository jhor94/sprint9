import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Book } from '../../interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private backUrl:string
  private apiUrl:string

  constructor(private http: HttpClient) { 
    this.backUrl = environment.endpoint;
    this.apiUrl = '/books';
  }

  searchtBooks(searchQuery:string): Observable <Book[]>{
    const params = new HttpParams().set('search', searchQuery)

    return this.http.get<Book[]>(`${this.backUrl}${this.apiUrl}/search`, {params})
   }

   addBook(book:Book){

   }

   updateBook(book:Book): Observable<any>{
    return this.http.patch<any>(`${this.backUrl}${this.apiUrl}${book.external_id_api}`, book)
   }
}
