import {Component} from '@angular/core';
import {ModalController, NavController, MenuController} from 'ionic-angular';
import {UserManager} from '../../providers/user';
import {IndexPage} from "../index/index-page";
import {UserSelectionPage} from "../user-selection/user-selection";
import {AdminkaPage} from "../adminka/adminka";
import {RegistrationPage} from "../registration/registration";
import {PasswordRecoveryPage} from "../password-recovery/password-recovery";
import {BeerAlertProvider} from "../../providers/beer-alert/beer-alert";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  defaultPhone = '(999)1234567';

  account: { phone: string, email: string, password: string } = {
    phone: '', // this.defaultPhone,
    email: 'test@example.com',
    password: ''
  };

  // Our translated text strings
  //private loginErrorString: string;

  constructor(private navCtrl: NavController,
              private modalCtrl: ModalController,
              private user: UserManager,
              public menu: MenuController,
              private beerAlert: BeerAlertProvider) {

    /*
        this.translateService.get('LOGIN_ERROR').subscribe((value) => {
          this.loginErrorString = value;
        })
    */
  }

  //todo deinso may be during optimization replace with ionViewDidEnter ?
  ngOnInit(){
    this.user.getLastPhoneLogged().then((phone) => {
      console.log("LAST PHONE: " + phone);

      if (phone) {
        let phoneMasked = phone.replace(/^\+7(\d{3})(\d{3})(\d{2})(\d{2})$/, '($1) $2-$3-$4');
        if (phoneMasked) {
          this.account.phone = phoneMasked;
        }
        else{
          console.log("No phone masked");
        }
      }
    });
  }

  onUserSelection(usersList) : Promise<any>{
    return new Promise((resolve, reject)=>{
      let userSelection = this.modalCtrl.create(
        UserSelectionPage, {usersList: usersList});

      userSelection.onDidDismiss(
        //todo handle reject
        (data, role) => data ? resolve(data) : reject());

      userSelection.present();
    });
  }

  onCardSelection(cardsList){
    return Promise.resolve(cardsList[0]);
  }

  // Attempt to login in through our UserManager service
  doLogin() {
    let showErr = err => {
      return this.beerAlert.alert(err);
    };


    let phoneNumberCleared = (this.account.phone || "").replace(/[^\d+]/g,'');
    if (phoneNumberCleared == '000'){
      this.account.phone = this.defaultPhone;
      this.navCtrl.push(AdminkaPage);
    }
    else{
      if (!this.account.phone || (this.account.phone.length < 10 && this.account.phone.length !== 3)){
        //todo deniso make proper validation
        //https://www.joshmorony.com/advanced-forms-validation-in-ionic-2/
        return this.beerAlert.alert('Пожалуйста, введите номер телефона');
      }


      this.user.login(this.account, this.onUserSelection.bind(this), this.onCardSelection.bind(this))
        .then(() => this.navCtrl.setRoot(IndexPage))
        .catch((msg) => {
          showErr(msg);
        });

    }
  }

  registration(){
    //wtf? seems to be accidentally copied code
    this.menu.close();

    // navigate to the new page if it is not the current page
    this.navCtrl.push(RegistrationPage);
  }

  restoreRassword(){
    this.navCtrl.push(PasswordRecoveryPage, {phone: this.account.phone});
  }
}
