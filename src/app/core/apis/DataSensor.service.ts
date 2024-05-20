import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSensorService {
  endpoint = 'http://localhost:3000/api/dataSensor';
  _http = inject(HttpClient);

  getAllDataSensor(body: any): Observable<any> {
    return this._http.post(this.endpoint, body);
  }

  createDataSensor(body: any): Observable<any> {
    return this._http.post(this.endpoint + '/create', body);
  }

  sortLowToHigh(body: any): Observable<any> {
    return this._http.post(this.endpoint + '/sort/lowToHigh', body);
  }

  sortHighToLow(body: any): Observable<any> {
    return this._http.post(this.endpoint + '/sort/highToLow', body);
  }
}
