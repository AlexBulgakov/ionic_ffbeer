import {Injectable} from '@angular/core';
import {iikoBizApi} from '../providers/iikoBizApi.service';
import {Storage} from '@ionic/storage';
import {ModalController} from "ionic-angular";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import {ConfirmCodePage} from "../pages/confirm_code/confirm_code";
import * as md5 from 'md5';
import {LoaderCounterProvider} from "./loader-counter/loader-counter";
import {EmailSenderProvider} from "./email-sender/email-sender";

/**
 * Most apps have the concept of a UserManager. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This UserManager provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // UserManager fields your app needs, like "id", "name", "email", etc.
 *   }
 * }
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class UserManager {
  STORE_KEYS = {
    GUEST_LOGGED: 'guest_logged',
    LAST_PHONE_LOGGED: 'last_phone_logged',
    CARD_LOGGED: 'card_logged',
    GUEST_USER_INFO: '_guestInfo'
  };

  _STORE_ON_LOGOUT = ['LAST_PHONE_LOGGED'];

  _countryCode = '7';
  _user: any;
  _cache = {};

  _defaultMessage = "Извините, произошла ошибка :( Попробуйте пожалуйста еще раз чуть позже ";
  _noUserMessage = "Не удалось найти пользователя с таким телефоном и паролем";
  _noCardMessage = "У пользователя отсутствует информация о пароле, обратитесь пожалуйста в поддержку";

  emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  _setCache(key, value): void {
    this._cache[key] = value;
  }

  _getCache(key) {
    return this._cache[key];
  };

  constructor(private iikoBizApi: iikoBizApi,
              public loadingCtrl: LoaderCounterProvider,
              private storage: Storage,
              private modalCtrl: ModalController,
              public emailSender: EmailSenderProvider) {
  }

  init(): Promise<any> {
    //just for caching
    console.log("UserManager init");
    return this.getOrganizationAll();
  }

  getOrganizationAll(): Promise<any> {
    if (!this._getCache("_organizations")) {
      this.loadingCtrl.show();

      return this.iikoBizApi.api().organization.list.get()
        .then(result => {

          //todo process failure of getFirstOrganization
          //todo check with {code: null, description: null, httpStatusCode: 401, message: "Wrong access token"}

          if (result && result.status == 200){
            let organizations = result.body;
            this._setCache("_organizations", organizations);
            console.log("Cached organisations: ", this._getCache("_organizations"));
          }

          return this._getCache("_organizations") || [];
        })
        .then(result => {
          this.loadingCtrl.hide();
          return result;
        });
    }
    else {
      //todo deniso cache invalidation
      console.log("Organisations from cache: ", this._getCache("_organizations"));
      return Promise.resolve(this._getCache("_organizations"));
    }
  }

  getOrganizationFirst(): Promise<any> {
    return this.getOrganizationAll().then(result => {
      let organization = result[0];
      console.log("org: ", organization);
      return organization;
    });
  }

  getPhoneNumberFormatted(phoneNumberRaw) {
    let phoneNumberCleared = (phoneNumberRaw || "").replace(/[^\d+]/g, '');
    let phoneNumberFull;

    switch(phoneNumberCleared.length){
      case '9991234567'.length:
        phoneNumberFull = "+" + this._countryCode + phoneNumberCleared;
            break;
      case '79991234567'.length:
        phoneNumberFull = "+" + phoneNumberCleared;
            break;
      case '+79991234567'.length:
        phoneNumberFull = phoneNumberCleared;
        break;

      default:
        console.error("Ошибка в номере телефона: ", phoneNumberCleared);
    }

    return phoneNumberFull;
  }


  authByPhone(phoneNumber) {
    this.loadingCtrl.show();

    return this.getOrganizationFirst().then((organization) => {
      return this.iikoBizApi.api().mobileIikoCard5.authenticatePhone.post({
        organizationId: organization.id,
        phoneNumber: phoneNumber
      })
    })
      .then(result => {
        this.loadingCtrl.hide();
        return result;
      });
  }

  getCustomerByPhone(phoneNumber) {
    this.loadingCtrl.show();

    return this.getOrganizationFirst().then((organization) => {
      return this.iikoBizApi.api().customers.getCustomerByPhone.get({
        organization: organization.id,
        phone: phoneNumber
      })
    })
      .then((x) => {
        console.log(x);
        return x;
      })
      .then(result => {
        this.loadingCtrl.hide();
        return result;
      })
  }

  getUserGreeting(): Promise<string> {
    let h = (new Date()).getHours();
    let greeting = '';
    if (h > 6 && h < 12) {
      greeting = 'Доброе утро';
    }
    else if (h >= 12 && h < 18) {
      greeting = 'Добрый день';
    }
    else if (h >= 18 && h <= 23) {
      greeting = 'Добрый вечер';
    }
    else {
      greeting = 'Доброй ночи';
    }

    return this.getLoggedUserInfo()
      .then(userInfo => greeting + (userInfo && userInfo.name ? `, ${userInfo.name}` : '') + '!' );
  }

  getLoggedCardInfo(): Promise<any> {
    return this.storage.get(this.STORE_KEYS.CARD_LOGGED);
  }

  // cached, taken from localStorage
  getLoggedUserInfo(): Promise<any> {
    console.log("getLoggedUserInfo call");
    return this.storage.get(this.STORE_KEYS.GUEST_LOGGED).then(
      (value) => {
        console.log("getLoggedUserInfo result");
        console.log(`${this.STORE_KEYS.GUEST_LOGGED} = ${JSON.stringify(value)}`);
        return value;
      }
    );
  }

  // net request
  getLoggedGuestInfo(): Promise<any> {
    return this.getLoggedUserInfo()
      .then( userInfo => userInfo ? this.getGuestInfoById(userInfo.id) : null)
  }

  setLastPhoneLogged(phone): Promise<any> {
    phone = this.getPhoneNumberFormatted(phone);
    return this.storage.set(this.STORE_KEYS.LAST_PHONE_LOGGED, phone);
  }

  getLastPhoneLogged(): Promise<any> {
    //return this.getLoggedUserInfo();
    return this.storage.get(this.STORE_KEYS.LAST_PHONE_LOGGED).then((value) => {
      console.log('getLastPhoneLogged(): ', value);
      return value;
    });
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any, onUserSelection: (guestsList) => Promise<any>, onCardSelection: (cardsList) => Promise<any>) {

    let phoneNumber = this.getPhoneNumberFormatted(accountInfo.phone);

    return this.getCustomerByPhone(phoneNumber)
      .then(guestResponse => this._processAuth(accountInfo, guestResponse, onCardSelection));

    /*
      this.user.getCode(this.account).subscribe((resp) => {
      }, (err) => {
        //todo error message
    */

    /*
        let response = new Observable(observer => {
          setTimeout(() => {
            observer.next({
              success: true,
              user: {
                name: 'Denis'
              }
            })
          }, 500);
        });

        return response;
    */
  }

  _chooseCardIfMany(user, onCardSelection: (user) => Promise<{ user: object, card: object }>): Promise<{ user: any, card: any }> {
    let cardsList = user.cards;

    let result = {user: user, card: null};
    // alert('todo - card selection');

    result.card = cardsList.pop();
    return Promise.resolve(result);
/*
    if (cardsList.length < 2) {
    }
    else {
      return onCardSelection(user);
    }
*/
  }

  enterCode(guest) {

    return new Promise((resolve, reject) => {
      let confirmation = this.modalCtrl.create(ConfirmCodePage);

      confirmation.onDidDismiss(
        //todo handle reject
        (data, role) => {

          //todo deniso remove debug
          data = guest;

          data ? resolve(data) : reject()
        });

      confirmation.present();
    });
  }

  _checkPassword(accountInfo, card) {
    if (card) {
      let track = card.Track;
      if (track) {
        if (this.getPasswordValue(accountInfo.password) !== track) {
          throw this._noUserMessage;
        }
      }
    }
    else {
      throw this._noCardMessage;
    }
  }

  _processAuth(accountInfo, result, onCardSelection: (guestsList) => Promise<any>) {
    if (result.status == 200) {
      let guest = result.body;

      return this._chooseCardIfMany(guest, onCardSelection)
        .then((userAndCard) => {
          this._checkPassword(accountInfo, userAndCard.card);

          this.storage.set(this.STORE_KEYS.GUEST_LOGGED, userAndCard.user);

          //todo set
          this.storage.set(this.STORE_KEYS.LAST_PHONE_LOGGED, userAndCard.user.phone);
          this.storage.set(this.STORE_KEYS.CARD_LOGGED, userAndCard.card);
          this._setCache(this.STORE_KEYS.CARD_LOGGED, userAndCard.card);
          return userAndCard;
        });

    }
    else {
      let exception = result.body.exception || "";
      let message = result.body.message;

      if (message) {
        let noUser = "There is no user with phone ";
        if (message.indexOf(noUser) === 0) {
          message = this._noUserMessage;
        }
        else {
          message = this._defaultMessage + (exception + " " + message).trim();
        }
      }
      else {
        message = this._defaultMessage;
      }

      console.log(result.body);
      throw message;
    }
  }

  getQrCodeSource() {
    return (this._getCache(this.STORE_KEYS.CARD_LOGGED) || {}).id || "";
  }


  getGuestInfoBatch(guestsList): Promise<any> {
    let guestsInfoPromises = guestsList.map(guest => this.getGuestInfoById(guest.id));
    return Promise.all(guestsInfoPromises);
  }

  getGuestInfoById(guestId: string): Promise<any> {
    let guestInfoCacheKey = this.STORE_KEYS.GUEST_USER_INFO;
    let cachedUserInfo = this._getCache(guestInfoCacheKey);
    if (cachedUserInfo) {
      return Promise.resolve(cachedUserInfo)
    }
    else {
      this.loadingCtrl.show();

      return this.getOrganizationFirst()
        .then((organization) => {
          return this.iikoBizApi.api().customers.getCustomerById.get({organization: organization.id, id: guestId})
        })
        .then((response) => {
          this._setCache(guestInfoCacheKey, response.body);
          console.log("guest info: ", this._getCache(guestInfoCacheKey));
          return this._getCache(guestInfoCacheKey);
        })
        .then(result => {
          this.loadingCtrl.hide();
          return result;
        });

    }
  }

  getCode(accountInfo: any) {
    // example of observable stub
    let response = new Observable(observer => {
      setTimeout(() => {
        observer.next({
          success: true,
          user: {
            name: 'Denis'
          }
        })
      }, 500);
    });
    return response;
  }

  confirmCode(accountInfo: any) {
    let response = new Observable(observer => {
      setTimeout(() => {
        observer.next({
          success: true,
          user: {
            name: 'Denis'
          }
        })
      }, 500);
    });

    return response;
  }


  /**
   * Log the user out, which forgets the session
   */
  logout(): Promise<any> {
    let clearingPromises = [];
    for (let key in this.STORE_KEYS) {
      if (this._STORE_ON_LOGOUT.indexOf(key) != -1) {
        continue;
      }

      console.log(key + " is cleared");
      let p = this.storage.remove(this.STORE_KEYS[key]);
      clearingPromises.push(p);
    }

    //todo deniso send smth to server?

    let promisesBatch = Promise.all(clearingPromises);

    return promisesBatch;
  }

  getPasswordValue(password: string){
    return md5(password);
  }

  _createOrUpdate(account: any) {
    let phone = this.getPhoneNumberFormatted(account.phone);

    let customer = {
      name: account.name,
      phone: phone,

      //todo remove temp hack
      magnetCardTrack: this.getPasswordValue(account.password),

      magnetCardNumber: phone,
      birthday: "1999-01-01",
      email: account.email,
      middleName: "",
      surName: account.surname || "",
      sex: 0,
      // shouldReceivePromoActionsInfo: boolean - possible field
    };

    this.loadingCtrl.show();

    return this.getOrganizationFirst()
      .then((organization) => {
        return this.iikoBizApi.api().customers.createOrUpdate.post({organization: organization.id, customer: customer})
      })
      .then(result => {
        this.loadingCtrl.hide();
        return result;
      });
  }

  registerUser(account){
    let phone = this.getPhoneNumberFormatted(account.phone);

    return this.getCustomerByPhone(phone).then(customerResponse => {
      if (customerResponse.status == 200){
        throw "Пользователь с номером " + phone + " уже зарегистрирован";
      }

      return this._createOrUpdate(account)
    });
  }

  updatePassword(phoneRaw: string, newPassword: string){
    let phone = this.getPhoneNumberFormatted(phoneRaw);

    return this.getCustomerByPhone(phone).then(customerResponse => {
      if (customerResponse.status != 200){
        throw "Пользователь не найден";
      }

      let account = {
        email: customerResponse.body.email,
        phone: customerResponse.body.phone,
        name: customerResponse.body.name,
        password: newPassword
      };

      return this._createOrUpdate(account);
    });
  }




  getRandomCode(){
    let maxCode = 9999;
    let minCode = 1000;
    let code = Math.floor(Math.random() * (maxCode - minCode) + minCode);
    return code;
  }

  sendRecoveryCode(phoneRaw: string){
    let phone = this.getPhoneNumberFormatted(phoneRaw);

    return this.getCustomerByPhone(phone).then(customerResponse => {
      if (customerResponse.status !== 200){
        throw "Пользователь с номером " + phone + " не найден";
      }

      let recoveryCode = this.getRandomCode();

      let email = customerResponse.body.email || "";

      if (!this.isEmailValid(email)){
        return {status: 0, emptyEmail: true}
      }

      let messageParams = {
        "to_addr": email,
        recoveryCode,
      };

      return this.emailSender.send("password_recovery", messageParams)
        .then(() => {
          return {status: 200, recoveryCode, email}})
        .catch(() => {
          return {status: 0, msg: "Не удалось отправить письмо"}})

      //return this._createOrUpdate(account)
    });
  }

  isEmailValid(email: string): boolean{
    return email && this.emailRegEx.test(email);
  }
}
