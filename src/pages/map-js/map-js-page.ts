// https://www.joshmorony.com/ionic-2-how-to-use-google-maps-geolocation-video-tutorial/
// https://www.joshmorony.com/creating-an-advanced-google-maps-component-in-ionic-2/

import {Component, OnInit, ViewChild, NgZone} from '@angular/core';
import {UserManager} from "../../providers/user";

import {Content, NavController} from "ionic-angular";
import {iikoBizApi} from "../../providers/iikoBizApi.service";

import {AgmMap} from "@agm/core";
import {GeocoderService} from "../../providers/geocoder.service";
import {DomSanitizer} from "@angular/platform-browser";
import {LoaderCounterProvider} from "../../providers/loader-counter/loader-counter";
import {BeerAlertProvider} from "../../providers/beer-alert/beer-alert";

interface MapItem {
  lat: number,
  lng: number,
  title: string,
  address: string,
  place: any,
  openingHours: any[]
}

@Component({
  selector: 'page-map-js',
  templateUrl: 'map-js-page.html'
})

export class MapJsPage implements OnInit {
  @ViewChild(Content) content: Content;
  @ViewChild(AgmMap) map: AgmMap;

  placesService;

  //Saint Petersburg
  defaultPoint = {
    lat: 59.9343,
    lng: 30.3351
  };

  lat = this.defaultPoint.lat;
  lng = this.defaultPoint.lng;

  // default is 8
  // experimentally picked value for SPb = 11
  zoom = 11;

  selectedMarker: MapItem;

  mapItems: MapItem[] = [];

  pageType: "mappedItems" | "listedItems" = "mappedItems";

  loading;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoaderCounterProvider,
              private iikoBizApi: iikoBizApi,
              private user: UserManager,
              private geo: GeocoderService,
              private _zone: NgZone,
              private sanitizer:DomSanitizer,
              private beerAlert: BeerAlertProvider
  ) {
  }

  ngOnInit() {
    this.loadingCtrl.show();
  }

  getMarkers() {
    //debug
    //return Promise.resolve(this._mapItemsStub);

    this.loadingCtrl.show();

    return this.user.getOrganizationFirst().then((o) => {
      return this.iikoBizApi.api().deliverySettings.getDeliveryTerminals.get({
        organization: o.id
      })
        .then(result => {
          this.loadingCtrl.hide();
          return result;
        })
        .then(result => result.body);
    });
  }

  mapReady() {
    this.loadingCtrl.hide();

    let placeServicePromise = new Promise((resolve, reject) => {
      this.map["_mapsWrapper"].getNativeMap().then(
        (nativeMap) => {
          this.placesService = this.geo.getPlacesService(nativeMap);
          resolve();
        });
    });

    let markersPromise = this.getMarkers();

    Promise.all([markersPromise, placeServicePromise])
      .then(result => {
        let markersResponse = result[0];

        let additionalInfoPromises = [];

        for (let marker of markersResponse.deliveryTerminals) {

          let promise = this.getAdditionalMarkerInfo(marker).then(mapItemExt => {
            this._zone.run(_ => {
              console.log("mapItemExt: ", mapItemExt);
              if (mapItemExt) {
                this.mapItems.push(mapItemExt);
              }
            });

          });

          additionalInfoPromises.push(promise);
        }

        return Promise.all(additionalInfoPromises);
      })
      .then( _ => {
        if (this.mapItems.length == 0) {
          this.beerAlert.alert("Не найдены маркеры для отображения на карте");
        }
      })
  }

  getAdditionalMarkerInfo(marker): Promise<any> {
    //debug
    //marker.technicalInformation = "ChIJOW1DflpKtUYRF8gLIoMaAiM";

    if (!marker.technicalInformation){
      console.error("Поле marker.technicalInformation пусто. Оно должно содержать placeId для Google Places Service", marker);
      return Promise.resolve(null);
    }

    let request = {placeId: marker.technicalInformation};
    let promisePlace = new Promise((resolve, reject) =>
      this.placesService.getDetails(request, (place, status) =>
        status == this.geo.PlacesServiceStatusOK ? resolve(place) : reject())
    );

    return promisePlace.then(place => {
      let address = place['vicinity'];
      let addrParts = address.split(",");
      if (addrParts.length){
        //move city from end to the beginning
        address = [].concat(addrParts.pop(), addrParts).join(', ');
      }

      let mapItem = {
          title: marker.name,
          address: address,
          openingHours: this.convertOpeningHoursToHumanReadable(place['opening_hours'].periods),
          lat: place['geometry'].location.lat(),
          lng: place['geometry'].location.lng(),
          place
        };

        return mapItem;
      })
      .catch( e => {
        console.error("Ошибка при получении места из Google Places Service", request, e);
      });
  }

  hideMarker() {
    this.selectedMarker = null;
  }

  sanitize(url:string){
    return
  }

  calltoUrl(){
    let url = 'tel:' + (this.selectedMarker as any).place.international_phone_number.replace(/\s/g,'-');
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  onMarkerClick(markerData) {
    this.selectedMarker = markerData;
    this.lat = markerData.lat;
    this.lng = markerData.lng;

  }

  convertOpeningHoursToHumanReadable(openingHoursPeriods){
    const weekDaysNames = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
    console.log("openingHoursPeriods", openingHoursPeriods);

    let humarRedablePeriods = [];
    let firstDay;
    let lastDay = '';
    let prevPeriod;

    let isSameTimeChecker = (time1, time2) => time1.hours == time2.hours && time1.minutes == time2.minutes;


    let opensLength = openingHoursPeriods.length;
    for (var i = 0; i < opensLength; i++) {
      let nowPeriod = openingHoursPeriods[i];

      let nowWeekDay = weekDaysNames[i];
      if (!firstDay) {
        firstDay = nowWeekDay;
        //continue;
      }
      else {
        prevPeriod = openingHoursPeriods[i - 1];
        let isSameTime = isSameTimeChecker(nowPeriod.open, prevPeriod.open) && isSameTimeChecker(nowPeriod.close, prevPeriod.close);
        if (isSameTime) {
          lastDay = nowWeekDay;
          //continue;
        }
        else {
          humarRedablePeriods.push({firstDay, lastDay, period: prevPeriod});
          firstDay = nowWeekDay;
          lastDay = null;
        }
      }
    }
    humarRedablePeriods.push({firstDay, lastDay, period: prevPeriod, closed: false});

    // todo maybe push also days missing in open periods ( == closed)

    console.log("humarRedablePeriods", humarRedablePeriods);

    return humarRedablePeriods;
  }
}
