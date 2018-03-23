import {Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UserProductsProvider} from "../../providers/userProducts";
import {OrderConfirmationPage} from "../order-confirmation/order-confirmation";
import {BeerProduct} from "../../iikoStructures/BeerProduct.class";
import * as _ from 'lodash';

@Component({
  selector: 'page-basket',
  templateUrl: 'basket.html',
})

export class BasketPage {
  pageTitle: string = 'Корзина';
  products : BeerProduct[] = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userProducts: UserProductsProvider,
              ) {
    this.init();
  }

  getFilter(){
    return (data) => {
      return this.userProducts.basketAmountCached(data.id) > 0;
    }
  };

  gotoConfirmation(){
    this.navCtrl.push(OrderConfirmationPage);
  }

  init(){
    return this.userProducts.getBasketProducts().
        then(ps => this.products = ps);
  }

  isBasketFilled(){
    if (!this.products) return false;
    return _.some(this.products, this.getFilter());
  }
}
