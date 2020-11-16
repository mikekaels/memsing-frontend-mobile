import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Md5 } from 'ts-md5/dist/md5';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private api: ApiService
  ) {
    this.initializeApp();
    // [...Array(32)].map(i => (~~(Math.random() * 36)).toString(36)).join('')

    const obj = JSON.stringify({
      // object: null,
      randomStr: [...Array(31)].map(i => (~~(Math.random() * 36)).toString(36)).join(''),
      appSecret: 'c612eb28APSZ'
    }).toString();

    console.log('OBJ: ', obj);

    const sign = Md5.hashStr(obj);

    console.log('SIGN: ', sign);

    const newObj = JSON.stringify({
      appId: '154901677851943631995',
      sign: sign,
      randomStr: JSON.parse(obj).randomStr
    });

    console.log('NEW OBJ: ', newObj);

    // this.api.post('api/open/token/get_token', null, newObj).subscribe(
    //   res => {
    //     console.log('RESPONSE: ', res);
    //   }
    // );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
