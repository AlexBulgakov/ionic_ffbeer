import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-user-selection',
  templateUrl: 'user-selection.html',
})
export class UserSelectionPage {

  usersList : any[]= [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController
  ) {

    this.usersList = this.navParams.get('usersList');
  }

  selectUser(user) {
    this.viewCtrl.dismiss(user);
  }
}
