import { Injectable } from '@angular/core';
import {Loading, LoadingController} from "ionic-angular";

@Injectable()
export class LoaderCounterProvider {

  _count = 0;
  _loading: Loading;
  _presentPromise: Promise<any>;

  constructor(public loadingCtrl: LoadingController) {
  }

  show(): Promise<any>{
    if (this._count === 0) {
      this._loading = this.loadingCtrl.create({
        spinner: "dots"
      });

      this._presentPromise = this._loading.present();
    }
    this._count++;

    //this._loading.setContent(this._count + "+");

    return this._presentPromise;
  }

  hide(): Promise<any>{
    if (this._count === 0) return;

    this._count--;

    //this._loading.setContent(this._count + "-");

    if (this._count === 0) {
      return this._loading.dismiss();
    }
    else{
      return Promise.resolve(true);
    }
  }
}
