import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import {UserManager} from "../../providers/user";
import {LoginPage} from "../login/login";
import {RulesPage} from "../rules/rules";
import {BeerAlertProvider} from "../../providers/beer-alert/beer-alert";

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  account: { phone: string, email: string, password: string , name: string , surname: string} = {
    phone: '', // this.defaultPhone,
    email: '',
    password: '',
    name: '',
    surname: ''
  };

  ZabirayMenyaSkoreyUvoziZaStoMorey = false;
  personalDataOk = false;
  rulesOk = false;

  constructor(private user: UserManager,
              public navCtrl: NavController,
              private beerAlert: BeerAlertProvider,
  ) {}

  doRegister(){
    //todo deniso replace with angular validation

    if (!this.account.phone || this.account.phone.trim().length != 10){
      return this.beerAlert.alert("Введите пожалуйста номер телефона, в формате 9991234567");
    }

    if (!this.account.name){
      return this.beerAlert.alert("Введите пожалуйста ваше имя");
    }

    if (!this.account.surname){
      return this.beerAlert.alert("Введите пожалуйста вашу фамилию");
    }

    if (!this.user.isEmailValid(this.account.email)){
      return this.beerAlert.alert("Введите пожалуйста корректный email");
    }

    if (!this.account.password || (this.account.password.trim().length < 4)){
      return this.beerAlert.alert("Введите пожалуйста пароль, минимум 4 символа");
    }

    if (!this.ZabirayMenyaSkoreyUvoziZaStoMorey){
      return this.beerAlert.alert("Регистрация возможна только для лиц старше 18 лет");
    }

    if (!this.personalDataOk){
      return this.beerAlert.alert("Для регистрации требуется Ваше согласие на обработку персональных данных");
    }

    return this.user.registerUser(this.account).then(response => {
      if (response.status == 200){
        this.user.setLastPhoneLogged(this.account.phone);

        this.navCtrl.setRoot(LoginPage)
          .then(_ => this.beerAlert.alert('Регистрация прошла успешно, теперь вы можете войти в приложение'));

      }
      else{
        return this.beerAlert.alert('Произошла ошибка, пожалуйста попробуйте еще раз');
      }
    }).catch(e => {
      return this.beerAlert.alert("Ошибка: " + e);
    });
  }


  showRules(){
    this.navCtrl.push(RulesPage);
  }
}
