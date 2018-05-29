import { MessageServiceProvider } from './../../providers/message-service/message-service';
import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { Credential } from './../models/credential.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { regexValidators } from '../validators/validator';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public credentialsForm: FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public formBuilder: FormBuilder,
              public authProvider: AuthProvider,
              public menuCtrl: MenuController,
              public messageProvider: MessageServiceProvider) {

    this.credentialsForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.pattern(regexValidators.email), Validators.required])],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(false, 'appMenu');
  }

  onSignIn() {
    let credential = new Credential(
      this.credentialsForm.value.username, 
      this.credentialsForm.value.password
    )

    let loading = this.messageProvider.showLoading();

    console.log('login.onSignIn: ' + credential);
    this.authProvider.login(credential).then((res) => {
      loading.dismiss();
      console.log('login.onSignIn res: ' + JSON.stringify(res));

      if (res.user) {
        this.menuCtrl.enable(true, 'appMenu');
        this.navCtrl.setRoot(HomePage, {}, { animate: true, direction: 'foward' });
      } else {
        this.messageProvider.showToast(res.message);
      }
    }).catch((error) => {
      loading.dismiss();
      this.messageProvider.showAlert('Alerta', 'Falha de autenticação.<br> Verifique sua conexão de dados.');
    });
  }

  onForgotPassword() {

  }

  onSignOut() {

  }

}
