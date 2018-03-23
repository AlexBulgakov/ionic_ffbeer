import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

declare var google: any;

@Injectable()
export class GeocoderService {
  constructor() {}

  get PlacesServiceStatusOK(){
    return google.maps.places.PlacesServiceStatus.OK;
  }

  getLatLan(address: string) {
    console.log('Getting Address - ', address);
    let geocoder = new google.maps.Geocoder();
    return Observable.create(observer => {
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          observer.next(results[0].geometry.location);
          observer.complete();
        } else {
          //todo deniso error handling
          /*
                    console.log('Error - ', results, ' & Status - ', status);
                    observer.next({});
                    observer.complete();
          */
        }
      });
    })
  }

  getPlacesService(nativeMap){
    return new google.maps.places.PlacesService(nativeMap);
  }
}
