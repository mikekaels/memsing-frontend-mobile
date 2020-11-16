import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'https://open.algiot.com';
  constructor(
    private http: HttpClient
  ) { }

  post(endpoint: string, params?: any, reqOpts?: any) {

    console.log(endpoint, params, reqOpts);

    if (reqOpts) {
      reqOpts = {
        // params: new HttpParams(),
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Alg-OpenParam': reqOpts
        })
      };
    }

    if (params) {
      reqOpts.params = new HttpParams();
      for (const p in params) {
        console.log('P::: ', p);
        if (p) {
          reqOpts.params = reqOpts.params.set(p, params[p]);
        }
      }
    }

    return this.http.post(this.url + '/' + endpoint, null, reqOpts);
  }
}
