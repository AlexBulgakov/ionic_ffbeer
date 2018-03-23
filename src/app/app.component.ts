import { Component, ViewChild } from '@angular/core';

import {Platform, MenuController, Nav, Config} from 'ionic-angular';

import { IndexPage } from '../pages/index/index-page';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { iikoBizApi } from '../providers/iikoBizApi.service';
import { LoginPage } from "../pages/login/login";

import { TranslateService } from '@ngx-translate/core'

import {UserManager} from "../providers/user";
import {MapJsPage} from "../pages/map-js/map-js-page";
import {BasketPage} from "../pages/basket/basket";
import {SommelierPage} from "../pages/sommelier/sommelier";
import {WishlistPage} from "../pages/wishlist/wishlist";
import {FeedbackPage} from "../pages/feedback/feedback";
import {UserProductsProvider} from "../providers/userProducts";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {StopListsProvider} from "../providers/stop-lists/stop-lists";
import {LoaderCounterProvider} from "../providers/loader-counter/loader-counter";
import {NewsPage} from "../pages/news/news";
import {FaqPage} from "../pages/faq/faq";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = LoginPage;
  afterLoginPage = IndexPage;

  pages: Array<{title: string, component: any}>;

  faqPageMenuItem = { title: 'FAQ', component: FaqPage };

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public userProducts: UserProductsProvider,
    public stopListsProvider: StopListsProvider,
    public translate: TranslateService,
    public config: Config,
    public iikoBizApi: iikoBizApi,
    public userManager: UserManager,
    public loadingCtrl: LoaderCounterProvider
  ) {
    this.initTranslate();

    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Главная', component: IndexPage },
// todo deniso func rss
      { title: 'Новости и акции', component: NewsPage },
      { title: 'Геолокация', component: MapJsPage },
      { title: 'Каталог', component: ListPage },
      { title: 'Подбор пива', component: SommelierPage },
      { title: 'Корзина', component: BasketPage },
      { title: 'Избранное', component: WishlistPage },
      { title: 'Напиши нам', component: FeedbackPage },
      //not used now, but actually useful
//      { title: 'Настройки', component:  AdminkaPage },
//      { title: 'Карта Native', component: MapPage },
    ];
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('ru');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  initializeApp(): void {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.loadingCtrl.show();

      this.iikoBizApi.init()
        .then(() => this.userManager.getLoggedUserInfo())
        .then((loggedInfo) => {
          if (loggedInfo){
            this.nav.setRoot(this.afterLoginPage);
            return this.userManager.getGuestInfoById(loggedInfo.id);
          }
        })
        .then(() => this.userManager.init())
        .then((userInfo) => this.initStopLists(userInfo))
        .then(() => this.loadingCtrl.hide());
    });
  }

  initStopLists(userInfo){
    console.log("initStopLists");
    if (userInfo){
      this.stopListsProvider.getDeliveryStopList();
        //todo deniso remove debug, enable code
        // then(()=> this.userProducts.checkStopListItems())
    }
  }

  logout(){
    this.userManager.logout().
      then(_ => this.menu.close()).
      then(_ => this.nav.setRoot(this.rootPage));
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close().then( _ =>
      // navigate to the new page if it is not the current page
      this.nav.setRoot(page.component));
  }

  menuItemSubject(p){
    let subj:BehaviorSubject<number> = this.userProducts.subjects[p.component.name];
    if (subj) {
      let value = subj.getValue();
      if (value) {
        return subj;
      }
    }
  }
}
