import { Injectable } from '@angular/core';
import { Localizaciones } from '../../interfaces/localizaciones';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LocalizacionesService {

  private backUrl:string
  private apiUrl:string


  constructor(private http: HttpClient) { 
    this.backUrl = environment.endpoint;
    this.apiUrl = '/localizaciones';
  }

  getLocalizaciones(): Observable <Localizaciones[]>{
    return this.http.get<{code:number, msg:string, data:Localizaciones[]}>(`${this.backUrl}${this.apiUrl}`)
       .pipe(
          map(response => response.data)
        )
   }
}
