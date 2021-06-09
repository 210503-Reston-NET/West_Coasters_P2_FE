import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy } from '@angular/core';

import Map from '@arcgis/core/Map';
import esriConfig from '@arcgis/core/config.js';
import MapView from '@arcgis/core/views/MapView';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})


export class MapComponent implements OnInit, OnDestroy {
  public view : any = null;

  @ViewChild('mapViewNode', { static: true }) private mapViewEl : any;

  initializeMap() : Promise<any> {
    console.log('init map triggered');
    const container = this.mapViewEl.nativeElement;
    esriConfig.apiKey = "AAPKe972efc85860456dbd0fe6c227d8fc92xaIGZA98q-ZPD6Mak-Iks7mZbFg_xeYadDJ5nWB5JGbJbIjkdSVXJG0v5p_Jai8O";
    const map = new Map({
      basemap: "streets"
    });

    const view = new MapView({
      container: container,
      center: [-118.805, 34.027], // Longitude, latitude
      zoom: 13, // Zoom level
      map: map
    });
    this.view = view;
    console.log(view);
    return this.view.when(() => console.log('map has loaded'));
  }
  constructor() { }

  ngOnInit(): any {
    console.log('calling init map');
    this.initializeMap().then(() => {
      // The map has been initialized
      console.log('The map is ready.');
    });
  }
  ngOnDestroy(): void {
    if (this.view) {
      // destroy the map view
      this.view.destroy();
    }
  }
}
