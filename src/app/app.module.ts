import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {HttpClientModule, HttpClient} from '@angular/common/http';

import {IndexPage} from '../pages/index/index-page';
import {ItemDetailsPage} from '../pages/item-details/item-details';
import {ListPage} from '../pages/list/list';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {iikoBizApi} from '../providers/iikoBizApi.service';
import {LoginPage} from "../pages/login/login";

import {TranslateService} from '@ngx-translate/core'
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {UserManager} from "../providers/user";
import {ConfirmCodePage} from "../pages/confirm_code/confirm_code";
import {IonicImageLoader} from 'ionic-image-loader';

import {IonicStorageModule} from '@ionic/storage';
import {MapPage} from "../pages/map/map-page";
//import {GoogleMaps} from "@ionic-native/google-maps";
import {MapJsPage} from "../pages/map-js/map-js-page";
import {NomenclatureProvider} from '../providers/nomenclatureProvider';
import {CategoryPage} from "../pages/category/category";
import {UserSelectionComponent} from '../components/user-selection/user-selection';
import {UserSelectionPage} from "../pages/user-selection/user-selection";
import {AdminkaPage} from "../pages/adminka/adminka";
import {AppVersion} from "@ionic-native/app-version";
import { Device } from '@ionic-native/device';
import {ProductsListComponent} from '../components/products-list/products-list';
import {BasketPage} from "../pages/basket/basket";
import {ProductItemComponent} from '../components/product-item/product-item';
import {NewsPage} from "../pages/news/news";
import {SommelierPage} from "../pages/sommelier/sommelier";
import {FeedbackPage} from "../pages/feedback/feedback";
import {FaqPage} from "../pages/faq/faq";
import {WishlistPage} from "../pages/wishlist/wishlist";
import {UserProductsProvider} from "../providers/userProducts";
import {AppDebugConfigServiceProvider} from '../providers/appConfig.service';
import {FilterDataService} from '../providers/filterData.service';
import {ArticleListComponent} from '../components/article-list/article-list';
import {ArticleSingleComponent} from '../components/article-single/article-single';
import {KeepHtmlPipe} from '../pipes/keep-html/keep-html';
import {ArticlePage} from "../pages/article/article";
import {GeocoderService} from '../providers/geocoder.service';
import { StopListsProvider } from '../providers/stop-lists/stop-lists';

// add these imports
import { AgmCoreModule } from '@agm/core';
import {RegistrationPage} from "../pages/registration/registration";
import {OrderConfirmationPage} from "../pages/order-confirmation/order-confirmation";
import {OrderInfoPage} from "../pages/order-info/order-info";
import {NguiAutoCompleteModule} from "@ngui/auto-complete";
import {RulesPage} from "../pages/rules/rules";
import { LoaderCounterProvider } from '../providers/loader-counter/loader-counter';
import {EmptyCardComponent} from "../components/empty-card/empty-card";
import { NewsAndFaqProvider } from '../providers/news-and-faq/news-and-faq';
import {PasswordRecoveryPage} from "../pages/password-recovery/password-recovery";
import { EmailSenderProvider } from '../providers/email-sender/email-sender';
import { BeerAlertProvider } from '../providers/beer-alert/beer-alert';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    AdminkaPage,
    IndexPage,
    LoginPage,
    RegistrationPage,
    PasswordRecoveryPage,
    RulesPage,
    ConfirmCodePage,
    ItemDetailsPage,
    ListPage,
    MapPage,
    MapJsPage,
    BasketPage,
    CategoryPage,
    UserSelectionComponent,
    EmptyCardComponent,
    UserSelectionPage,
    ProductsListComponent,
    ProductItemComponent,
    NewsPage,
    SommelierPage,
    FeedbackPage,
    FaqPage,
    WishlistPage,
    OrderConfirmationPage,
    OrderInfoPage,
    ArticleListComponent,
    ArticleSingleComponent,
    KeepHtmlPipe,
    ArticlePage,
  ],
  imports: [
    NguiAutoCompleteModule,
    IonicImageLoader.forRoot(),
    IonicStorageModule.forRoot(),
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDvcQWs0GzzB13UkCMYTgvMXyVBite6O1M',
      libraries: ['places']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IndexPage,
    AdminkaPage,
    LoginPage,
    RegistrationPage,
    PasswordRecoveryPage,
    RulesPage,
    ConfirmCodePage,
    ItemDetailsPage,
    ListPage,
    MapPage,
    MapJsPage,
    BasketPage,
    CategoryPage,
    UserSelectionComponent,
    EmptyCardComponent,
    UserSelectionPage,
    ProductsListComponent,
    NewsPage,
    SommelierPage,
    FeedbackPage,
    FaqPage,
    WishlistPage,
    OrderConfirmationPage,
    OrderInfoPage,
    ArticlePage
  ],
  providers: [
    //GoogleMaps,
    UserManager,
    iikoBizApi,
    TranslateService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NomenclatureProvider,
    AppVersion,
    Device,
    UserProductsProvider,
    AppDebugConfigServiceProvider,
    FilterDataService,
    GeocoderService,
    StopListsProvider,
    LoaderCounterProvider,
    NewsAndFaqProvider,
    EmailSenderProvider,
    BeerAlertProvider
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
