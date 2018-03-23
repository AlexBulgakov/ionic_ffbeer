import {Component} from '@angular/core';
import {UserProductsProvider} from "../../providers/userProducts";
import {BeerProduct} from "../../iikoStructures/BeerProduct.class";

@Component({
  selector: 'page-wishlist',
  templateUrl: 'wishlist.html',
})
export class WishlistPage {
  pageTitle: string = 'Wishlist';
  products : BeerProduct[] = null;

  getFilter(){
    let self = this;
    return function (data) {
      return self.userProducts.isFavoriteCached(data.id);
    }
  };

  constructor(public userProducts: UserProductsProvider) {
  }

  ionViewDidEnter(){
    return this.userProducts.getFavoritesProducts().
       then(  ps => this.products = ps);
  }
}
