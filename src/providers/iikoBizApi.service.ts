import { Injectable } from '@angular/core';
import * as IikoBizServerApi from 'iikobiz-serverapi-raml/build/js-client/index.js';
import {LoaderCounterProvider} from "./loader-counter/loader-counter";

@Injectable()
export class iikoBizApi {

  private serverURLInApp = 'http://78.47.168.234/'; //'https://iiko.biz:9900/';  // URL to web api
  private serverUrlWeb = 'http://biz.labex.pro/';  // URL necessary only to match proxy rule in ionic config or nginx conf
  private serverURLDebug = '/';  // URL necessary only to match proxy rule in ionic config or nginx conf
  //private headers = {'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest'};

  private queryParamsToCache = ['organizationId'];
  private cache = {};

  private client;
  private accessToken;

  constructor(public loadingCtrl: LoaderCounterProvider) {

    let serverAddr = this.getApiAddr();

    this.client = new IikoBizServerApi({
      //todo logic to use prod url for builds
      baseUri: serverAddr,
      user: {
        sign: this.signRequest.bind(this)
      }
    });

  }

  getApiAddr(): string{
    let serverAddr : string;

    if (document.URL.startsWith('http')){
      if (document.location.href.indexOf('://localhost') == -1){
        serverAddr = this.serverUrlWeb;
      }
      else{
        serverAddr = this.serverURLDebug;
      }
    }
    else{
      serverAddr = this.serverURLInApp;
    }

    return serverAddr;
  }

  api(){
    return this.client.api['0'];
  }

  getUserSecrets(){
    return {
      //      user_id: 'APIe.ivanov@open-s.info',
      //      user_secret: 'H0Lj3m6B'

      user_id: 'FF_Consumer',
      user_secret: 'FF_Consumer'
    };
  }

  init(): Promise<any> {
    //todo what if token expires?
    const userSecrets = this.getUserSecrets();

    let accessToken;
    let accessTokenQuery;

    this.loadingCtrl.show();

    return this.api().auth.accessToken.get(userSecrets)
      .then(result => {
        this.loadingCtrl.hide();
        return result;
      })
      .then(result => {
        console.log(result.body);
        this.accessToken = result.body;
        accessTokenQuery = {'access_token': accessToken};
      });
  }

  getLast(paramName:string): any{
    return this.cache[paramName];
  }

  _doCache(requestParams) : void {
    for (var i = 0; i < this.queryParamsToCache.length; i++) {
      let paramName = this.queryParamsToCache[i];
      if (requestParams.hasOwnProperty(paramName)){
        this.cache[paramName] = requestParams[paramName];
      }
    }
  }

  _getRequestParams(options) : any {
    let requestParams;

    if (options.method == 'get'){
      requestParams = options.query;
    }
    else if (options.method == 'post') {
      requestParams = options.body;
    }
    else {
      throw "unknown request type - " + options.method;
    }

    return requestParams;
  }

  _setRequestParams(options, requestParams) : void {
    if (options.method == 'get'){
      options.query = requestParams;
    }
    else if (options.method == 'post') {
      options.body = requestParams;
    }
  }

  signRequest(options): void{
    let requestParams = this._getRequestParams(options);

    if (requestParams){
      this._doCache(requestParams);
    }

    // even in case of empty query - we may need to add token if exists
    //todo list of method that should not be signed ?
    if (this.accessToken){
      requestParams =  requestParams || {};

      let checkingUrl = options.url.substr(options.url.indexOf('/api/'));
      console.log("SIGNING_REQUEST: '" + checkingUrl + "'ß");

      //todo deniso remove this hack
      let isProblematicUrl = ["/api/0/customers/create_or_update", "/api/0/orders/add"].indexOf(checkingUrl) > -1;
      if (isProblematicUrl){
        if (!options.query){
          options.query = {};
        }
        options.query.access_token = this.accessToken;
        options.query.organization = options.body.organization;
      }


      //api has some troubles :)
      requestParams.access_token = this.accessToken;
      requestParams.accessToken = this.accessToken;
    }

    this._setRequestParams(options, requestParams);

    return options;
  }
}
