import { Injectable } from '@angular/core';
import {NomenclatureProvider} from "./nomenclatureProvider";
import { Storage } from '@ionic/storage';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import * as _ from 'lodash';
import {StopListsProvider} from "./stop-lists/stop-lists";
import {BeerProduct} from "../iikoStructures/BeerProduct.class";
import {BeerAlertProvider} from "./beer-alert/beer-alert";

@Injectable()
export class UserProductsProvider {
  products: any[] = null;

  basketAmountSubject : BehaviorSubject<number>  =  new BehaviorSubject<number>(0);
  favoritesAmountSubject : BehaviorSubject<number>  =  new BehaviorSubject<number>(0);

  subjects = {
    BasketPage: this.basketAmountSubject,
    WishlistPage: this.favoritesAmountSubject
  };

  _cache = {
    favorites: null,
    basket: null
  };

  STORE_KEYS = {
    'FAVORITES' : 'favorites',
    'BASKET' : 'basket'
  };


  constructor(public storage: Storage,
              public nomenclatureProvider: NomenclatureProvider,
              public stopListsProvider: StopListsProvider,
              private beerAlert: BeerAlertProvider,
  ) {
    this._getBasket().then((data) => {
      this._cache.basket = data;
      this.basketAmountSubject.next(this._getBasketSizeCached());
    });

    this._getFavorites().then((data) => {
      this._cache.favorites = data;
      this.favoritesAmountSubject.next(this._getFavoritesSizeCached());
    });
  }

  _showMsg(msg){
    return this.beerAlert.alert(msg);
  };


  _checkStopListedFavorites(){
    return this._getFavorites().then((result) => {
      let someMoved = false;
      for(let itemId in result){
        //todo deniso remove empty values
        if (!result[itemId]) {
          continue;
        }

        //todo deniso check that exists in nomenclature
        if (this.stopListsProvider.isStopListed(itemId) == false){
          this.basketAdd(itemId, 1);
          this.favoritesToggle(itemId);
          someMoved = true;
        }
      }

      return someMoved;
    });
  }

  _checkStopListedBasket(){
    return this._getBasket().then((result) => {
      let someMoved = false;
      for(let itemId in result){
        //todo deniso remove empty values
        if (!result[itemId]) {
          continue;
        }

        //todo deniso check that exists in nomenclature
        if (this.stopListsProvider.isStopListed(itemId) == true){
          this.basketRemove(itemId, true);
          //todo deeniso better use something like "add" instead of "toggle"
          this.favoritesToggle(itemId);
          someMoved = true;
        }
      }

      return someMoved;
    });
  }

  checkStopListItems(): void {
    this._checkStopListedFavorites().then(favoritesMoved =>
      this._showMsg("Покупки из Wishlist появились в продаже, проверьте корзину."));

    this._checkStopListedBasket().then(basketMoved =>
      this._showMsg("К сожалению, некоторые позиции корзины пропали из продажи и временно перенесены в Wishlist."));
  }

  _getFavoritesSizeCached(){
    return _.size(_.compact(_.values(this._cache.favorites)));
  }

  _getFavorites(){
    return this.storage.get(this.STORE_KEYS.FAVORITES).
    then((x) => {
      this._cache.favorites = x || {};
      let size = this._getFavoritesSizeCached();
      this.favoritesAmountSubject.next(size);
      return this._cache.favorites;
    });
  }

  _getBasketSizeCached(){
    return _.size(_.compact(_.values(this._cache.basket)));
  }

  _getBasket(){
    return this.storage.get(this.STORE_KEYS.BASKET).
    then((x) =>{
      this._cache.basket = x || {};
      let size = this._getBasketSizeCached();
      this.basketAmountSubject.next(size);

      return this._cache.basket;
    });
  }

  clearBasket(): Promise<any>{
    this._cache.basket = {};
    this.basketAmountSubject.next(0);
    return this.storage.remove(this.STORE_KEYS.BASKET);
  }

  isFavoriteCached(productId: string): boolean{
    return this._cache.favorites[productId];
  }

  isFavorite(productId: string): Promise<boolean>{
    return this._getFavorites().
    then((result) => result[productId]);
  }

  favoritesToggle(productId): Promise<any>{
    return this._getFavorites().
    then((result) => {
      result[productId] = !result[productId];
      this._cache.favorites = result;
      return this.storage.set(this.STORE_KEYS.FAVORITES, result);
    });
  }

  basketAmountCached(productId: string): number{
    return this._cache.basket[productId] || 0;
  }

  basketAmount(productId: string): Promise<number>{
    return this._getBasket().
    then((result) => result[productId]);
  }

  basketAdd(productId, amount?: number): Promise<boolean>{
    return this._getBasket().
    then((result) => {
      if (amount){
        result[productId] = amount;
      }
      else{
        result[productId] = result[productId] ? ++result[productId] : 1;
      }
      this._cache.basket = result;
      return this.storage.set(this.STORE_KEYS.BASKET, result);
    });
  }

  basketRemove(productId, totally?:true): Promise<boolean>{
    return this._getBasket().
    then((result) => {
      if (totally){
        result[productId] = 0;
      }
      else{
        result[productId] = result[productId] ? --result[productId] : 0;
      }
      this._cache.basket = result;
      return this.storage.set(this.STORE_KEYS.BASKET, result);
    });
  }

  getBasketProducts() : Promise<BeerProduct[]> {
    return this._getBasket().
    then((ids) => {
      return this.nomenclatureProvider.getFiltered((beer : BeerProduct) => {
        let amount = ids[beer['id']];
        return amount !== 0 ? beer : null;
      });
    });
  }

  getFavoritesProducts() : Promise<BeerProduct[]> {
    return this._getFavorites().
    then((ids) => {
      return this.nomenclatureProvider.getFiltered((beer : BeerProduct) => {
        let isFavorite = ids[beer['id']];
        return isFavorite ? beer : null;
      });
    });
  }
}
