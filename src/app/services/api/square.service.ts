import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from '../../models/hero';
@Injectable({
  providedIn: 'root'
})
export class SquareService {

  nonce: string;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  setNonce(nonce: string) {
    this.nonce = nonce;
  }


  payment(hero: Hero): Observable<any> {
    return this.http.post<Hero>('http://localhost/api/square', hero, this.httpOptions).pipe(
      tap(_ => this.log(`Square payment `)),
      catchError(this.handleError<Hero>('Post Hero'))
    );
  }

  /**
* Handle Http operation that failed.
* Let the app continue.
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    //this.messageService.add(`PictureService: ${message}`);
    console.info(`SquareService: ${message}`);
  }

}
