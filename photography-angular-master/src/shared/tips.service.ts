import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import {UtilsService} from './utils.service';
import {config} from '../config';


@Injectable({
  providedIn: 'root'
})
export class TipsService {

  REST_API: string = config.API_URL;
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient,private utilsService:UtilsService) { 
  }

  getTipsData(): Observable<any> {
    let API_URL = `${this.REST_API}/tips`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.utilsService.handleError)
      )
  }
}
