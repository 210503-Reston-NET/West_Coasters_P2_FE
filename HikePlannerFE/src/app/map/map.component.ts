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
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'; 
import Graphic from '@arcgis/core/Graphic';
import Polyline from '@arcgis/core/geometry/Polyline';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})


export class MapComponent implements OnInit, OnDestroy {
  public view : any = null;
  public selectedTrail: any = null;
  public selectedTrailhead: any = null;
  public selected: any = null;
  public id: number = 0;
  public customShape: any = null;
  public graphicsLayer = new GraphicsLayer();

  constructor(private mapService: MapService) { 

  }

  @ViewChild('mapViewNode', { static: true }) private mapViewEl : any;

  initializeMap() : Promise<any> {
    const container = this.mapViewEl.nativeElement;
    
    esriConfig.apiKey = "AAPKe972efc85860456dbd0fe6c227d8fc92xaIGZA98q-ZPD6Mak-Iks7mZbFg_xeYadDJ5nWB5JGbJbIjkdSVXJG0v5p_Jai8O";
    const map = new Map({
      basemap: "arcgis-topographic"
    });
    map.add(this.graphicsLayer);

    const view = new MapView({
      container: container,
      center: [-120.06488,39.08818], //Longitude, latitude
      zoom: 11,
      map: map
    });


    this.view = view;
    
    const popupTrailheads = {
      title: "{RECAREANAME}",
      // content: "<b>Type: </b> {MARKERACTIVITY} <br/><b>Forest:</b> {FORESTNAME}<br><b>Status: </b>{OPENSTATUS}<br><b>Website:</b> <a href='{RECAREAURL}'>{RECAREAURL}</a> <br> <b>Description:</b> {RECAREADESCRIPTION}",
      // actions: [thAction]
    };

    const trailheadsLayer = new FeatureLayer({
      url: "https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_RecreationOpportunities_01/MapServer",
      outFields: ["*"],
      popupTemplate: popupTrailheads
    });
    map.add(trailheadsLayer);

    const popupTrails = {
      "title": "{TRAIL_NAME}"
      // "content": "<b>Typical Trail Grade:</b> {TYPICAL_TRAIL_GRADE}<br><b>GIS Miles:</b> {GIS_MILES}"
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
        console.log('click event', response);
        if(response.results.length == 1) {
          this.selected = null;
        }
        else {
          this.selected = response.results[0].graphic;
        }
      });
    });

    return this.view.when(
      // save this for activity view...
      () => {
        this.mapService.GetTrailById(371897).then( result => {
          console.log('it worked!!', result);
          const line = new Polyline();
          line.addPath(result.features[0].geometry.paths[0]);
          const simpleLineSymbol = {
            type: "simple-line",
            color: [226, 119, 40], // Orange
            width: 2
          };
          const polylineGraphic = new Graphic({
            geometry: line,
            symbol: simpleLineSymbol
          });
          this.graphicsLayer.add(polylineGraphic);
          this.view.goTo(line);
        });
      }
    );
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
