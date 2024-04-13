import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActionHistoryService {
  endpoint = 'http://localhost:3000/api/history';
  _http = inject(HttpClient);

  getAllHistory(body: any): Observable<any> {
    return this._http.post(this.endpoint, body);
  }
}
