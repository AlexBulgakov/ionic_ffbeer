import { Injectable } from '@angular/core';
import {iikoBizApi} from "./../iikoBizApi.service";
import {UserManager} from "../user";
import * as _ from 'lodash';
import {LoaderCounterProvider} from "../loader-counter/loader-counter";


@Injectable()
export class StopListsProvider {
  _rawCache;
  _isStopListPresent = false;

  constructor(
    public user: UserManager,
    public loadingCtrl: LoaderCounterProvider,
    public iikoBizApi: iikoBizApi) {
  }

  getDeliveryStopList(): Promise<any> {
    console.log("getDeliveryStopList");
    if (typeof this._rawCache !== "undefined"){
      console.log("getDeliveryStopList - cached");
      return Promise.resolve(this._rawCache);
    }
    else {
      console.log("getDeliveryStopList - loader show");
      this.loadingCtrl.show();

      return this.user.getOrganizationFirst().then((organization) => {
        return this.iikoBizApi.api().stopLists.getDeliveryStopList.get({organization: organization.id})
          .then((result) => {
            console.log("getDeliveryStopList - really got it");
            this._rawCache = result.body;
            this._isStopListPresent = !!(this._rawCache.stopList || [])[0];
            return this._rawCache;
          });
      })
        .then(result => {
          console.log("getDeliveryStopList - loader hide");
          this.loadingCtrl.hide();
          return result;
        });
    }
  }

  isStopListed(productId): boolean {
    if (!this._isStopListPresent){
      return false;
    }

    //todo deniso - summarize all stoplists to get union items
    let result = productId && _.some(this._rawCache.stopList[0].items,
      (item) => {
        return item['productId'] == productId;
      }
    );

    return result;
  }
}
