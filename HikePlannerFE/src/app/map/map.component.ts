import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy } from '@angular/core';

import Map from '@arcgis/core/Map';
import esriConfig from '@arcgis/core/config.js';
import MapView from '@arcgis/core/views/MapView';
import Locate from '@arcgis/core/widgets/Locate';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Point from '@arcgis/core/geometry/Point';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})


export class MapComponent implements OnInit, OnDestroy {
  public view : any = null;

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

    const parcelLayerSQL = ["Choose a SQL where clause...", "UseType = 'Residential'",  "UseType = 'Government'", "UseType = 'Irrigated Farm'", "TaxRateArea = 10853", "TaxRateArea = 10860", "TaxRateArea = 08637", "Roll_LandValue > 1000000", "Roll_LandValue < 1000000"];
    let whereClause = parcelLayerSQL[0];

    const select = document.createElement("select");
      select.setAttribute("class", "esri-widget esri-select");
      select.setAttribute("style", "width: 200px; font-family: 'Avenir Next'; font-size: 1em");
      parcelLayerSQL.forEach(function(query){
        let option = document.createElement("option");
        option.innerHTML = query;
        option.value = query;
        select.appendChild(option);
      });

    const popupTrailheads = {
      "title": "{RECAREANAME}",
      "content": "<b>Long:</b> {LONGITUDE}<br><b>Lat:</b> {LATITUDE}<br><b>Website:</b> {RECAREAURL}<br><b>Id?:</b> {OBJECTID}"
    }

    const trailheadsLayer = new FeatureLayer({
      url: "https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_RecreationOpportunities_01/MapServer",
      outFields: ["RECAREANAME", "LONGITUTDE", "LATITUDE", "RECAREAURL","OPENSTATUS"],
      popupTemplate: popupTrailheads
    });

    map.add(trailheadsLayer);

    const popupTrails = {
      "title": "{TRAIL_NO}: {TRAIL_NAME}",
      "content": "<b>Type:</b> {TRAIL_TYPE}<br><b>obj id:</b> {OBJECTID}<br><b>GlobalID:</b> {GLOBALID}<br><b>GIS Miles:</b> {GIS_MILES}"
    }
    const trailsLayer = new FeatureLayer({
      url: "https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_TrailNFSPublish_01/MapServer/0",
      outFields: ["TRL_NAME","ELEV_GAIN"],
      popupTemplate: popupTrails
    });
    map.add(trailsLayer, 0);

     // Define popup for Parks and Open Spaces
    const popupOpenspaces = {
      "title": "{PARK_NAME}",
      "content": [{
        "type": "fields",
        "fieldInfos": [
          {
            "fieldName": "AGNCY_NAME",
            "label": "Agency",
            "isEditable": true,
            "tooltip": "",
            "visible": true,
            "format": null,
            "stringFieldOption": "text-box"
          },
          {
            "fieldName": "TYPE",
            "label": "Type",
            "isEditable": true,
            "tooltip": "",
            "visible": true,
            "format": null,
            "stringFieldOption": "text-box"
          },
          {
            "fieldName": "ACCESS_TYP",
            "label": "Access",
            "isEditable": true,
            "tooltip": "",
            "visible": true,
            "format": null,
            "stringFieldOption": "text-box"
          },

          {
            "fieldName": "GIS_ACRES",
            "label": "Acres",
            "isEditable": true,
            "tooltip": "",
            "visible": true,
            "format": {
              "places": 2,
              "digitSeparator": true
            },

            "stringFieldOption": "text-box"
          }
        ]
      }]
    }

    const parksLayer = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space_Styled/FeatureServer/0",
      outFields: ["TYPE","PARK_NAME", "AGNCY_NAME","ACCESS_TYP","GIS_ACRES","TRLS_MI","TOTAL_GOOD","TOTAL_FAIR", "TOTAL_POOR"],
      popupTemplate: popupOpenspaces
    });
    map.add(parksLayer, 0);

    const locate = new Locate({
      view: view,
      useHeadingEnabled: false,
      goToOverride: function(view, options) {
        options.target.scale = 1500;
        return view.goTo(options.target);
      }
    });
    view.ui.add(locate, "top-left");
    return this.view.when();
  }
  constructor() { }

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
}
