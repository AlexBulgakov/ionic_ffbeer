import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {LoaderCounterProvider} from "../../providers/loader-counter/loader-counter";
import {EmailSenderProvider} from "../../providers/email-sender/email-sender";
import {BeerAlertProvider} from "../../providers/beer-alert/beer-alert";
import {UserManager} from "../../providers/user";

@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  @ViewChild(NgForm) form;

  pageTitle: string = 'Напишите нам';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoaderCounterProvider,
              public emailSender: EmailSenderProvider,
              private beerAlert: BeerAlertProvider,
              private user: UserManager
    ) {
  }

  //todo deniso maybe enable captcha
  send() {

    if (!this.form.valid){
      this._showToast('Пожалуйста, заполните все поля формы');
      return;
    }

    this.user.getLoggedUserInfo().then(userInfo => {
       let value = this.form.value;
        let messageParams = {
          from_name: userInfo.name + " " + userInfo.surname + " " + userInfo.phone + " " + userInfo.email,
          title: value.title,
          message: value.message,
        };

        this._showLoading();

        this.emailSender.send("feedback_template", messageParams).then(this._onSuccess.bind(this)).catch(this._onError.bind(this)).then(this._hideLoading.bind(this));
      });
  }

  _showLoading() {
    this.loadingCtrl.show();
  }

  _hideLoading(){
    this.loadingCtrl.hide();
  }

  _onSuccess() {
    this.form.reset();

    let message = 'Спасибо, ваше сообщение отправлен и скоро мы ответим на него!';
    this._showToast(message);
  }

  _onError(err) {
    let message = 'Произошла ошибка при отправке, попробуйте еще раз пожалуйста. \n' + err;
    this._showToast(message);
  }

  _showToast(message){
    return this.beerAlert.alert(message);
  }
}
