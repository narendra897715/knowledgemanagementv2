import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class BusinesslogicService {
  public baseUrl;
  private messageSource = new BehaviorSubject(1);
  currentMessage = this.messageSource.asObservable();
  constructor(private http: HttpClient) {
    this.baseUrl = environment.api_url;
  }
  newPostAdded(categoryid) {
    this.messageSource.next(categoryid);
  }
  get(serviceName: string) {
    return this.http.get(this.baseUrl + serviceName).pipe(map(response => response));
  }

  post(serviceName: string, params: object | string | number) {
    return this.http.post(this.baseUrl + serviceName, params).pipe(map(res => res));
  }

  patch(serviceName: string, params: object | string | number, uniqueId: number) {
    return this.http.patch(this.baseUrl + serviceName + '/' + uniqueId + '/', params).pipe(map(res => res));
  }

  put(serviceName: string, params?: object | string | number) {
    return this.http.put(this.baseUrl + serviceName, params ? params : {}).pipe(map(res => res));
  }

  put_with_param(serviceName: string, params: object | string | number) {
    return this.http.put(this.baseUrl + serviceName, params).pipe(map(res => res));
  }

  delete(serviceName: string) {
    return this.http.delete(this.baseUrl + serviceName).pipe(map(res => res));
  }

  delete_body(serviceName: string, params: object | string | number) {
    return this.http.request('delete', this.baseUrl + serviceName, { body: params }).pipe(map(res => res));
  }
}
