import {Component, ViewChild} from '@angular/core';
import { UserManager } from "../../providers/user";
import * as QRCode from 'qrcode';
import {Content} from "ionic-angular";

@Component({
  selector: 'page-index',
  templateUrl: 'index-page.html'
})
export class IndexPage {
  @ViewChild(Content) content: Content;
  @ViewChild('QRCodeCanvas') QRCodeCanvas;


  //should be empty
  pageTitle: string = '';
  greeting: string;
  qrDone = false;
  qrError = "";
  bonuses: number = 0;

  get bonusesPlural(): string{
    return this._declOfNum(this.bonuses,
      ['бонус', 'бонуса', 'бонусов']);
  };

  // https://gist.github.com/realmyst/1262561
  _declOfNum(number: number, titles: string[]) {
    number = Math.floor(number);
    let cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
  }

  constructor(
    private user: UserManager) {}

  ionViewDidEnter(){
    this.user.getLoggedGuestInfo().then(user => {
        if (user && user.walletBalances && user.walletBalances[0]){
          this.bonuses = user.walletBalances[0].balance;
        }
    });

    this.user.getUserGreeting().then(greeting => this.greeting = greeting);

    this.user.getLoggedCardInfo().then( cardInfo => {
      let qrCodeSource = cardInfo && cardInfo.Track;
      if (qrCodeSource){
        this.drawQrCode(qrCodeSource);
      }
      else{
        this.qrError = "Извините, у пользователя отсутствует информация о картах :( \n"
          + "Обратитесь, пожалуйста, в тех поддержку."
      }
    });
  }

  drawQrCode(code) {
    //if (this.qrDone) return;

    //todo deniso remove hardcode
    let qrVersion = 3; //empirical
    let qrModules = 37; //for ver=3? but should be for 5
    let paddingWidth = 20;
    let contentWidth = this.content.contentWidth - paddingWidth;
    let contentHeight = this.content.contentHeight - paddingWidth;

    let contentMinEdge = Math.min(contentWidth, Math.round(contentHeight/2));

    let scale = Math.floor(contentMinEdge / qrModules);

    let maxScale = 8;
    scale = scale > maxScale ? maxScale : scale;
    console.log("scale: ", scale);

    let options = {
      version: qrVersion,
      scale: scale,
      color: {
        dark: '#000',  // Black dots
        light: '#0000' // Transparent background
      }
    };

    QRCode.toCanvas(this.QRCodeCanvas.nativeElement, code, options, function (error) {
      if (error) console.error(error);
    });

    this.qrDone = true;
  }

}
