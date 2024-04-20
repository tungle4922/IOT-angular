import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IPubReq, ISubReq } from '../models/Mqtt';

@Injectable({
  providedIn: 'root',
})
export class MqttService {
  endpoint = 'http://localhost:3000';
  _http = inject(HttpClient);

  publish(body: IPubReq): Observable<any> {
    return this._http.post(this.endpoint + '/publisher', body);
  }

  subscribe(body: ISubReq): Observable<any> {
    return this._http.post(this.endpoint + '/subscriber', body);
  }
}
