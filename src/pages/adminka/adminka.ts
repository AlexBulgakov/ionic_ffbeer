import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AppVersion} from "@ionic-native/app-version";
import {iikoBizApi} from "../../providers/iikoBizApi.service";
import { Device } from '@ionic-native/device';

@Component({
  selector: 'page-adminka',
  templateUrl: 'adminka.html',
})
export class AdminkaPage {
  appName = null;
  packageName = null;
  versionCode = null;
  versionNumber = null;
  lastReqId: string;

  window = window;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public appVersion: AppVersion,
              private iikoBizApi: iikoBizApi,
              public device: Device
  ) {
  }

  ngOnInit(){
    this.getAppVersion();
    this.lastReqId = '';
  }

  getAppVersion(){
    this.appVersion.getAppName()
      .then((x) => this.appName = x);

    this.appVersion.getPackageName()
      .then((x) => this.packageName = x);

    this.appVersion.getVersionCode()
      .then((x) => this.versionCode = x);

    this.appVersion.getVersionNumber()
      .then((x) => this.versionNumber = x);
  }

  getApiUserSecret(){
    let s = this.iikoBizApi.getUserSecrets();
    let result = `"${s.user_id}" / "${s.user_secret}"`;
    return result;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminkaPage');
  }

  chooseBackground(bgNumber){
    var styleEl = document.createElement('style'),
      styleSheet;
    document.head.appendChild(styleEl);
    styleSheet = styleEl.sheet;
    styleSheet.insertRule(`.content {  background: url("./assets/img/bg${bgNumber}.png"); background-size: cover;}`, styleSheet.cssRules.length);
  }

}
