import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpServiceProvider {

  private API_URL_BACKEND: string = "http://0.0.0.0:9000/mobile-api-gateway/v1/";
  
  private PROVIDER_SIGNATURE = "";
  private CLIENT_SECRET: string = "";
  private API_KEY: string = "";

  private headers: HttpHeaders = null;
  private token: string;

  constructor(public http: HttpClient) {
    this.headers = new HttpHeaders({
      'content-type': 'application/json',
      'xf-provider-signature': this.PROVIDER_SIGNATURE,
      'xf-client-secret': this.CLIENT_SECRET,
      'xf-api-key': this.API_KEY,
    });
  }

  public post(url: string, data: any = null, params: any = null): Promise<any> {
    console.log('httpService.post url: ' + url);
    
    return new Promise((resolve, reject) => {
      this.http.post(this.API_URL_BACKEND + url, data, { headers: this.headers, params: params })
          .subscribe(res => { resolve(res); },
                    error => { reject(error); });
    });
  }

  public get(url: string): Promise<any> {
    console.log('httpService.get url: ' + url);

    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL_BACKEND + url, { headers: this.headers })
          .subscribe(res => { resolve(res); },
                    error => { reject(error); });
    });
  }

}
