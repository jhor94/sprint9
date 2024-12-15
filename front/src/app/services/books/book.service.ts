import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { map, Observable, of } from 'rxjs';
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

  private cache: Map<string, any> = new Map();
  // Método para obtener los datos de la caché
  private getCache(key: string): any {
    const cachedData = localStorage.getItem(key);
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      console.log("datos en cache", parsedData)
      // Verificar si la caché ha expirado
      if (new Date().getTime() < parsedData.expiry) {
        return parsedData.data;
      } else {
        localStorage.removeItem(key); // Eliminar la caché que ha expirado
      }
    }
    return null;
  }


    // Método para almacenar en caché
  private setCache(key: string, data: any): void {
      const cacheData = {
        data,
        expiry: new Date().getTime() + 3600 * 1000 // Expira en 1 hora
      };
      localStorage.setItem(key, JSON.stringify(cacheData));
    }

  searchtBooks(searchQuery:string, page: number = 1): Observable <Book[]>{

    const cacheKey = `${searchQuery}-page-${page}`

    //verficacion de datos en cache
    const cachedData = this.getCache(cacheKey);
    //si esta en cache
    if(cachedData){
      console.log("devuelvo desde cache")
      return of (cachedData); // ok se usa para que devuelva como observable
    }

//si no esta en cache
    const params = new HttpParams().set('search', searchQuery).set('page',page.toString())
    console.log(params)

    return this.http.get<Book[]>(`${this.backUrl}${this.apiUrl}/search`, {params}).pipe(
      map((response:any)=>{
        this.setCache(cacheKey, response.data)
        console.log('datos recuperados del cache', cachedData)
        return response.data
      })
    )
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
