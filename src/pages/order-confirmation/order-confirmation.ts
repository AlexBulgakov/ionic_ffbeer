import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {UserProductsProvider} from "../../providers/userProducts";
import {UserManager} from "../../providers/user";
import {iikoBizApi} from "../../providers/iikoBizApi.service";
import {OrderInfoPage} from "../order-info/order-info";
import {BeerProduct} from "../../iikoStructures/BeerProduct.class";
import {LoaderCounterProvider} from "../../providers/loader-counter/loader-counter";
import {BeerAlertProvider} from "../../providers/beer-alert/beer-alert";

@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {
  products: BeerProduct[];
  totalAmount = 0;
  totalAmountRub: number;
  totalAmountKop: number;

  constructor(public userProducts: UserProductsProvider,
              public user: UserManager,
              private beerAlert: BeerAlertProvider,
              public loadingCtrl: LoaderCounterProvider,
              public navCtrl: NavController,
              public iikoBizApi: iikoBizApi) {
    this.init();
  }

  doFilter(data) {
    return this.userProducts.basketAmountCached(data.id) > 0;
  };

  getAmount(data) {
    return this.userProducts.basketAmountCached(data.id);
  }

  init() {
    return this.userProducts.getBasketProducts()
      .then(_products => this.products = _products)
      .then(this._getTotalAmount.bind(this));
  }

  _getTotalAmount(products: BeerProduct[]) {

    for (let product of products) {
      if (this.doFilter(product)) {
        this.totalAmount += product.price * this.getAmount(product);
      }
    }

    this.totalAmountRub = Math.round(this.totalAmount);
    this.totalAmountKop = this.totalAmount - this.totalAmountRub;
  }

  doOrder() {

    return Promise.all([
      this.user.getOrganizationFirst(),
      this.user.getLoggedGuestInfo(),
      this.userProducts.getBasketProducts(),
    ]).then((result) => {
      let [organization, userInfo, basketProducts] = result;
      return this.generateOrderRequest(organization, userInfo, basketProducts);
    });
  }

  generateOrderRequest(organization, userInfo, basketProducts: BeerProduct[]) {
    let orderRequest = {
      organization: null,
      customer: null,
      customerId: null,
      order: null
    };

    orderRequest.organization = organization.id;

    orderRequest.customer = {
      id: userInfo.id,
      name: userInfo.name,
      phone: userInfo.phone,
    };

    orderRequest.order = {
      id: null,
      isSelfService: true,
      phone: userInfo.phone,
      fullSum: this.totalAmount, //F*CK! this must be removed
      date: null,
      comment: '',
      items: basketProducts.filter((product) => this.userProducts.basketAmountCached(product.id)).map((product) => {
        return {
          id: product.id,
          name: product.name,
          amount: this.userProducts.basketAmountCached(product.id)
        }
      })
    };

    this.loadingCtrl.show();

    return this.iikoBizApi.api().orders.add.post(orderRequest)
      .then(result => {
        this.loadingCtrl.hide();
        return result;
      })
      .then(this.processOrderResponse.bind(this));
  }

  processOrderResponse(response) {
    if (response && response.status == 200) {
      let orderInfo = response.body;
      this.userProducts.clearBasket().then(
        () => {
          this.navCtrl.setRoot(OrderInfoPage, {orderInfo});
        }
      );
    }
    else {
      return this.beerAlert.alert('Извините, произошла ошибка. Попробуйте заказать еще раз позже');
    }
  }
}
