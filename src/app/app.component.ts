import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  /*
  menuItems: any[] = [
    { title: 'Inicio', link: '/', icon: 'home', direction: 'forward' },
    { title: 'Categorías', link: '/categories', icon: 'pricetag', direction: 'forward' },
    { title: 'Mi perfil', link: '/profile', icon: 'person', direction: 'forward' }
  ]
  */

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
