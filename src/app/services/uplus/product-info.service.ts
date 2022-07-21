import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { ProductInfo } from '../../models/uplus/product-info';
import { HandleHttpErrorService } from '../system/handle-http-error.service';

@Injectable()
export class ProductInfoService {

  url: string = environment.apiServerUrl;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private handleHttpErrorService: HandleHttpErrorService,
  ) { }

  /** GET All productInfos list from the server */
  getAllProductInfos(): Observable<ProductInfo[]> {
    return this.http.get<ProductInfo[]>(`${this.url}/h?dt=product&status=all`).pipe(
      catchError(this.handleHttpErrorService.handleError<ProductInfo[]>('ProductInfoService.getAllProductInfos'))
    );
  }

  /** GET Activated productInfos list from the server */
  getActivatedProductInfos(): Observable<ProductInfo[]> {
    return this.http.get<ProductInfo[]>(`${this.url}/h?dt=product&status=1`).pipe(
      catchError(this.handleHttpErrorService.handleError<ProductInfo[]>('ProductInfoService.getActivatedProductInfos'))
    );
  }

  /** GET productInfo by id.  */
  getProductInfo(id: number): Observable<ProductInfo> {
    return this.http.get<ProductInfo>(`${this.url}/h/${id}?dt=product`).pipe(
      catchError(this.handleHttpErrorService.handleError<ProductInfo>('ProductInfoService.getProductInfo'))
    );
  }

  /** PUT: update the productInfo on the server */
  updateProductInfo(productInfo: ProductInfo): Observable<any> {
    return this.http.put<number>(`${this.url}/h?dt=product`, productInfo, this.httpOptions).pipe(
      catchError(this.handleHttpErrorService.handleError<number>('ProductInfoService.updateProductInfo'))
    );
  }


  /** POST: add a new productInfo to the server */
  //增加时productInfo.code必须唯一，
  //返回值：成功时返回Id值，失败：-10 product code is required; -11 product code already exists; -12 product name is required; -1 errConnection; 0 fail
  addProductInfo(productInfo: ProductInfo): Observable<number> {
    return this.http.post<number>(`${this.url}/h?dt=product`, productInfo, this.httpOptions).pipe(
      catchError(this.handleHttpErrorService.handleError<number>('ProductInfoService.addProductInfo'))
    );
  }

  /** DELETE: delete the productInfo from the server */
  //返回值：成功时返回Id值，失败：-10 product code is required; -11 product code already exists; -12 product name is required; -1 errConnection; 0 fail
  deleteProductInfo(id: number): Observable<number> {
    return this.http.delete<number>(`${this.url}/h/${id}?dt=product`, this.httpOptions).pipe(
      catchError(this.handleHttpErrorService.handleError<number>('ProductInfoService.deleteProductInfo'))
    );
  }
}
