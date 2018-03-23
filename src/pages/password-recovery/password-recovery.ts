import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UserManager} from "../../providers/user";
import {LoginPage} from "../login/login";
import {LoaderCounterProvider} from "../../providers/loader-counter/loader-counter";
import {BeerAlertProvider} from "../../providers/beer-alert/beer-alert";

@Component({
  selector: 'page-password-recovery',
  templateUrl: 'password-recovery.html',
})
export class PasswordRecoveryPage {

  codeSent: number;
  codeEntered: number;

  phone: string;
  password: string;
  email: string;

  tryTimeoutSeconds = 60;
  tryTimeoutCountdownSeconds: number;
  tryTimeoutId;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public user: UserManager,
              private beerAlert: BeerAlertProvider,
              public loadingCtrl: LoaderCounterProvider) {
  }

  ionViewWillEnter(): void{
    this.phone = this.navParams.get('phone');
  }

  sentCode(){
    this.loadingCtrl.show();

    return this.user.sendRecoveryCode(this.phone).then(response => {
      if (response.status == 200) {

        this.codeSent = response.recoveryCode;
        this.email = response.email;
        this.runTryTimeout();
      }
      else {
        if (response.emptyEmail) {
          return this.beerAlert.alert('Для восстановления пароля - обратитесь пожалуйста к сотруднику на кассе ресторана');
        }
        else {
          return this.beerAlert.alert('Произошла ошибка, пожалуйста попробуйте еще раз');
        }
      }
    })
    .catch(e => {
      return this.beerAlert.alert("Ошибка: " + e);
    })
    .then(_ => this.loadingCtrl.hide());
  }

  runTryTimeout(){
    this.tryTimeoutCountdownSeconds = this.tryTimeoutSeconds;
    this.tryTimeoutId = setInterval(() => {
      this.tryTimeoutCountdownSeconds--;

      if (this.tryTimeoutCountdownSeconds <= 0){
        this.clearTryTimeout();
      }
    }, 1000);
  }

  clearTryTimeout(){
    clearInterval(this.tryTimeoutId);
    this.tryTimeoutId = 0;
    this.tryTimeoutCountdownSeconds = 0;
  }

  giveNextTry(){
    this.codeSent = 0;
  }

  resetPassword(){
    if (!this.codeEntered){
      return this.beerAlert.alert('Пожалуйста введите код подтверждения из письма');
    }

    if (this.codeEntered != this.codeSent){
      return this.beerAlert.alert('Введен неверный код подтверждения');
    }

    if (!this.password || (this.password.trim().length < 4)){
      return this.beerAlert.alert("Введите пожалуйста пароль, минимум 4 символа");
    }

    this.user.updatePassword(this.phone, this.password).then(() => {
      this.navCtrl.setRoot(LoginPage)
        .then(_ => this.beerAlert.alert('Пароль изменен, теперь вы можете войти в приложение'));
    });
  }
}
