import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Picture } from '../models/picture';

@Injectable()
export class CarouselPictureService {

    constructor(
        private http: HttpClient) { }

    getMainCarouselPictures(): Observable<Picture[]> {
        return this.http.get<Picture[]>('assets/json/main-carouesl-pictures.json')
            .pipe(
                catchError(this.handleError<Picture[]>('CarouselPictureService.getMainCarouselPictures Err', []))
            );
    }

    getMockExamCarouselPictures(): Observable<Picture[]> {
        return this.http.get<Picture[]>('assets/json/mock-exam-carouesl-pictures.json')
            .pipe(
                catchError(this.handleError<Picture[]>('CarouselPictureService.getMockExamCarouselPictures Err', []))
            );
    }

    getExamCarouselPictures(): Observable<Picture[]> {
        return this.http.get<Picture[]>('assets/json/exam-carouesl-pictures.json')
            .pipe(
                catchError(this.handleError<Picture[]>('CarouselPictureService.getExamCarouselPictures Err', []))
            );
    }

    getVedioCarouselPictures(): Observable<Picture[]> {
        return this.http.get<Picture[]>('assets/json/vedio-carouesl-pictures.json')
            .pipe(
                catchError(this.handleError<Picture[]>('CarouselPictureService.getVedioCarouselPictures Err', []))
            );
    }

    getTourCarouselPictures(): Observable<Picture[]> {
        return this.http.get<Picture[]>('assets/tour-carousel-pictures.json')
            .pipe(
                catchError(this.handleError<Picture[]>('PictureService.getPictures Err', []))
            );
    }

    getOneDayPictures(): Observable<Picture[]> {
        return this.http.get<Picture[]>('assets/one-day-tour.json')
            .pipe(
                catchError(this.handleError<Picture[]>('PictureService.getPictures Err', []))
            );
    }

    getMultiDayPictures(): Observable<Picture[]> {
        return this.http.get<Picture[]>('assets/multi-day-tour.json')
            .pipe(
                catchError(this.handleError<Picture[]>('PictureService.getPictures Err', []))
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
        console.info(`PictureService: ${message}`);
    }

}
