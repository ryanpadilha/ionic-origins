import { AuthProvider } from './../providers/auth/auth';
import { MessageServiceProvider } from './../providers/message-service/message-service';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage; // HomePage
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    public messageProvider: MessageServiceProvider, public authProvider: AuthProvider, 
    public menuCtrl: MenuController) {
      
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      // { title: 'Login', component: LoginPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logoutMenu() {
    let buttons = [{
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        this.menuCtrl.swipeEnable(false);
      }
    },
    {
       text: 'Sair',
       handler: () => {
        this.authProvider.logout();
        this.nav.setRoot(LoginPage);
      }
    }];

    this.messageProvider.showAlert('', 'Deseja realmente sair?', buttons);
  }
}
