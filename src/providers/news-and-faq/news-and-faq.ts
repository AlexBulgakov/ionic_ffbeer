import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {LoaderCounterProvider} from "../loader-counter/loader-counter";

@Injectable()
export class NewsAndFaqProvider {

  _dataPromise;

  constructor(
    public http: HttpClient,
    public loadingCtrl: LoaderCounterProvider,
  ) {}

  _getData(){
    if (!this._dataPromise) {

      this.loadingCtrl.show();

      this._dataPromise = this.http.get('http://ffbeer.ru/rsst.php').toPromise()
        .then(result => {
          if (result['news'] || result['faq']) {
            //no status available, so just check content
            return result;
          }
          else {
            console.error("Failed to get news/faq, bad data: ", result);
            this._dataPromise = null;
          }
        })
        .catch(e => {
          console.error("Failed to get news/faq: ", e);
          this._dataPromise = null;
        })
        .then((result) => {
          this.loadingCtrl.hide();
          return result;
        });
    }

    return this._dataPromise;
  }

  _postProcess(items : {'title': string, 'detail_picture': string, 'preview_picture': string, 'detail_text': string}[]){
    let urlPrefix = 'http://ffbeer.ru';

    function _correctUrl(item, propertyName){
      let propertyValue = (item[propertyName] || "").trim();
      if (propertyValue && propertyValue.indexOf(urlPrefix) === -1) {
        item[propertyName] = urlPrefix + propertyValue;
      }
    }

    items.forEach(item => {
      _correctUrl(item, 'detailPicture');
      _correctUrl(item, 'preview_picture');
    });

    return items;
  }

  _getArticles(name: 'news'|'faq'){
    return this._getData().then(result => {
      let articles = result[name] || [];
      let processed = this._postProcess(articles);
      return processed;
    });
  }

  getNews(){
    return this._getArticles('news');
  }

  getFaq(){
    return this._getArticles('faq');
  }
}
