/*
  In case of empty map - most likely this is problems with API key.
  It is wrong, or necessary service is not enabled in Google API Console.
 */

import {Component, ViewChild} from '@angular/core';
/*
import { UserManager } from "../../providers/user";
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
*/

@Component({
  selector: 'page-map',
  templateUrl: 'map-page.html'
})
export class MapPage {
  @ViewChild('map') mapElement;

  constructor( //private googleMaps: GoogleMaps,
              // private user: UserManager
  ) {}

// Load map only after view is initialized
  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {
    // make sure to create following structure in your view.html file
    // and add a height (for example 100%) to it, else the map won't be visible
    // <ion-content>
    //  <div #map id="map" style="height:100%;"></div>
    // </ion-content>

    // create a new map by passing HTMLElement
    // let element: HTMLElement = this.mapElement.nativeElement;

    let map: any;

    //let map: GoogleMap = this.googleMaps.create(element);

    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    /*
    map.one(GoogleMapsEvent.MAP_READY).then(
      () => {
        console.log('Map is ready!');
        // Now you can add elements to the map like the marker
      }
    );
    */
    // create CameraPosition
    let position = {
      target: {
        lat: 43.0741904,
        lng: -89.3809802
      },
      zoom: 18,
      tilt: 30
    };

    // move the map's camera to position
    map.moveCamera(position);

    let ionic = null; //new LatLng(43.0741904, -89.3809802);

    // create new marker
    let markerOptions: any /*MarkerOptions*/ = {
      position: ionic,
      title: 'Ionic'
    };

    map.addMarker(markerOptions)
      .then((marker/*: Marker*/) => marker.showInfoWindow());
  }

}
