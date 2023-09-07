import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import {UtilsService} from './utils.service';
import {config} from '../config';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  REST_API: string = config.API_URL;
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  public aboutInfo: Subject<any>;
  constructor(private httpClient: HttpClient,private utilsService:UtilsService) { 
    this.aboutInfo = new Subject();
  }

  setValue(value) {
    console.log(value);
    this.aboutInfo.next(value);
  }

  getValue(): Observable<any> {
    return this.aboutInfo.asObservable();
  }


  

  getAboutInfo(): Observable<any> {
    let API_URL = `${this.REST_API}/about`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.utilsService.handleError)
      )
  }

 
  sendSubscribeMail(data: any): Observable<any> {
    const API_URL =  `${this.REST_API}/subscriptions`;
    return this.httpClient.post<any>(API_URL, data);
  }

  



  
}
