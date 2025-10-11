import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, Observable, take, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private serverUrl = `${environment.serverUrl}/api`

  constructor(private http: HttpClient) { }

  get<T>(url: string, params?: string[]): Observable<T> {
    let getParams = ''
    if (params && params.length > 0) {
      getParams += (getParams ? '&' : '?') + params.join('&')
    }

    return this.http.get<T>(`${this.serverUrl}${url}${getParams}`)
      .pipe(
        take(1),
        catchError(err => {
          console.log(err)
          return throwError(() => err)
        })
      )
  }
}
