import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, takeUntil, switchMap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class LandingPageService {

  constructor(private http: HttpClient) { }

  logout(url): Observable<any[]> {
    return this.http.get<any[]>(url)
      .pipe();
  }
}