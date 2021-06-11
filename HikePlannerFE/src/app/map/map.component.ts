import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';

import Map from '@arcgis/core/Map';
import esriConfig from '@arcgis/core/config.js';
import MapView from '@arcgis/core/views/MapView';
import Locate from '@arcgis/core/widgets/Locate';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})


export class MapComponent implements OnInit, OnDestroy {
  public view : any = null;
  public selected: any = null;
  public id: number = 0;

  constructor() { 

  }

  @ViewChild('mapViewNode', { static: true }) private mapViewEl : any;

  initializeMap() : Promise<any> {
    const container = this.mapViewEl.nativeElement;
    
    esriConfig.apiKey = "AAPKe972efc85860456dbd0fe6c227d8fc92xaIGZA98q-ZPD6Mak-Iks7mZbFg_xeYadDJ5nWB5JGbJbIjkdSVXJG0v5p_Jai8O";
    const map = new Map({
      basemap: "arcgis-topographic"
    });

    const view = new MapView({
      container: container,
      center: [-118.80500,34.02700], //Longitude, latitude
      zoom: 13,
      map: map
    });
    this.view = view;
    
    const popupTrailheads = {
      title: "{RECAREANAME}",
      content: "<b>Long:</b> {LONGITUDE}<br><b>Lat:</b> {LATITUDE}<br><b>Website:</b> {RECAREAURL}<br><b>Id?:</b> {OBJECTID}, <b>Open?: </b>{OPENSTATUS}",
      // actions: [thAction]
    };

    const trailheadsLayer = new FeatureLayer({
      url: "https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_RecreationOpportunities_01/MapServer",
      outFields: ["*"],
      popupTemplate: popupTrailheads
    });

    map.add(trailheadsLayer);

    const popupTrails = {
      "title": "{TRAIL_NO}: {TRAIL_NAME}",
      "content": "<b>Type:</b> {TRAIL_TYPE}<br><b>obj id:</b> {OBJECTID}<br><b>GlobalID:</b> {GLOBALID}<br><b>GIS Miles:</b> {GIS_MILES}"
    }
    const trailsLayer = new FeatureLayer({
      url: "https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_TrailNFSPublish_01/MapServer/0",
      outFields: ["*"],
      popupTemplate: popupTrails
    });
    map.add(trailsLayer, 0);

    const locate = new Locate({
      view: view,
      useHeadingEnabled: false,
      goToOverride: function(view, options) {
        options.target.scale = 1500;
        return view.goTo(options.target);
      }
    });

    view.ui.add(locate, "top-left");
    view.on("click", (evt) =>{
      view.hitTest(evt).then((response) => {
        console.log('clicked', response);
        this.selected = response.results[0].graphic;
      });
    });

    return this.view.when();
  }

  ngOnInit(): any {
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

  customMap(): void {
    // console.log(this.mapService.GetTrailById(this.id));
  }
}
