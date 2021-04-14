import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  getAllNews(): Observable<any> {
    return this._http.get<any>("/api/viewnews");
  }

  getNewsById(newsId: number): Observable<any> {
    return this._http.get<any>(`/api/viewnews?NewsId=${newsId}`);
  }

}
