import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { map, Observable, of } from 'rxjs';
import { wishBook } from '../../interfaces/wishBook';

@Injectable({
  providedIn: 'root'
})
export class WhislistService {
  private backUrl:string
  private apiUrl:string

  constructor(private http: HttpClient) { 
    this.backUrl = environment.endpoint;
    this.apiUrl = '/booksWish';
  }

  addWishBook(wishbook:wishBook): Observable<void>{
    console.log(`${this.backUrl}${this.apiUrl}`)
    return this.http.post<void>(`${this.backUrl}${this.apiUrl}`, wishbook)
   }
  getWishlistbyUser(user_id:number):Observable<wishBook[]>{
      console.log(`${this.backUrl}${this.apiUrl}/${user_id}`)
      return this.http.get<{data: wishBook[]}>(`${this.backUrl}${this.apiUrl}/${user_id}`, {withCredentials:true})
          .pipe(
            map(response => response.data)
          )
    }

    deleteBookWish(id_book: number):Observable<wishBook[]>{
      return this.http.delete<wishBook[]>(`${this.backUrl}${this.apiUrl}/${id_book}`,{withCredentials:true})
    }
}
