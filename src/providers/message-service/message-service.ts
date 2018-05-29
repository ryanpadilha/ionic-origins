import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController } from 'ionic-angular';

@Injectable()
export class MessageServiceProvider {

  constructor(public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController) {

  }

  public showToast(message: string, position: string = 'bottom', duration: number = 3000) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position,
      cssClass: 'text-center'
    });

    toast.present();
  }

  public showLoading(message: string = '') {
    let loader = this.loadingCtrl.create({
      content: message
    });

    loader.present();
    return loader;
  }

  public showAlert(title: string, message: string, buttons: Array<string> = ['ok']) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: buttons
    });

    alert.present();
  }

}
