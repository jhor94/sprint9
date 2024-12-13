import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { map, Observable } from 'rxjs';
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

   addBook(book:Book): Observable<void>{
    return this.http.post<void>(`${this.backUrl}${this.apiUrl}`, book)
   }
   getBooksbyUser(user_id:number):Observable<Book[]>{
    console.log(`${this.backUrl}${this.apiUrl}/${user_id}`)
    return this.http.get<{data: Book[]}>(`${this.backUrl}${this.apiUrl}/${user_id}`, {withCredentials:true})
        .pipe(
          map(response => response.data)
        )
  }

   updateBook(book:Book): Observable<any>{
    return this.http.patch<any>(`${this.backUrl}${this.apiUrl}${book.external_id_api}`, book)
   }
}
