import { Injectable } from '@angular/core';
import {AlertController} from "ionic-angular";

@Injectable()
export class BeerAlertProvider {

  constructor(public alertCtrl: AlertController) {
  }

  alert(msg: string, handler?: Function){
    let alertWindow = this.alertCtrl.create({
      title: 'Пивная Культура',
      message: msg,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            if (handler){
              return handler();
            }
          }
        }
      ]
    });

    return alertWindow.present();
  }

}
