import { StorageProvider } from './../storage/storage';
import { HttpServiceProvider } from './../http-service/http-service';
import { Credential } from './../../pages/models/credential.model';
import { Session } from './../../pages/models/session.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthProvider {

  private session: Session;
  private URL_LOGIN: string = 'auth/login';
  private URL_LOGOUT: string = 'auth/logout';
  private URL_RECOVERY_PASSWORD: string = 'auth/recovery-password';

  constructor(public httpServiceProvider: HttpServiceProvider, public storageProvider: StorageProvider) {
    
  }

  public login(credential: Credential): Promise<any> {
    console.log('authProvider.login: ' + credential);

    return new Promise((resolve, reject) => {
      this.httpServiceProvider.post(this.URL_LOGIN, credential).then((res) => {
            if (res.token) {
              console.log('authProvider.login returned token: ' + res.token);

              this.session = new Session(res.token, res.user);
              this.createSessionStorage(this.session);
              resolve(res.user);
            } else {
              resolve(res);
            }
      }).catch(error => {
        reject(error);
      });
    });

  }

  public logout() {
    this.createSessionStorage(null);
  }

  public recoveryPassword() {

  }

  private createSessionStorage(session: Session) {
    console.log('authProvider.createSessionStorage session: ' + session);

    this.storageProvider.persist('token', session.token);
    this.storageProvider.persist('user', session.user);
  }

  public isLoggedin() {
    let token = this.storageProvider.get('token');
    console.log('authProvider.isloggedin: ' + (token != null))

    return (token != null) ? true : false;
  }

}
