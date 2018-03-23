import {Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {IndexPage} from "../index/index-page";

/**
 * Generated class for the OrderInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-order-info',
  templateUrl: 'order-info.html',
})
export class OrderInfoPage {
  orderInfo;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidEnter(){
    if (this.navParams.data && this.navParams.data.orderInfo){
      this.orderInfo = this.navParams.data.orderInfo;
    }
  }

  close(){
    this.navCtrl.setRoot(IndexPage);
  }
}
