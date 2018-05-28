import { Credential } from './../models/credential.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
              private formBuilder: FormBuilder) {

    this.credentialsForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.pattern(regexValidators.email), Validators.required])],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onSignIn() {
    let credential = new Credential(
      this.credentialsForm.value.username, 
      this.credentialsForm.value.password
    )

    console.log(credential);

  }

  onForgotPassword() {

  }

  onSignOut() {

  }

}
