import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

/*
import { MainPage } from '../../pages/pages';
import { ConfirmCode } from '../../pages/pages';

*/

@Component({
  selector: 'page-login',
  templateUrl: 'confirm_code.html'
})
export class ConfirmCodePage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { phone: string, code: string, email: string, password: string } = {
    phone: '+7 (999) 1234567',
    code: '1234',
    email: 'test@example.com',
    password: 'test'
  };

  // Our translated text strings
  //private loginErrorString: string;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController
  ) {

/*
    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
*/
  }

  doLogin() {
    this.viewCtrl.dismiss();
  }
}
