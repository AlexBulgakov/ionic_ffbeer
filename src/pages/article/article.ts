import { Component } from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-article',
  templateUrl: 'article.html',
})
export class ArticlePage {
  item: any;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidEnter(){
    let data = this.navParams.data;
    if (data && data.item){
      this.item = data.item;
    }
  }

}
