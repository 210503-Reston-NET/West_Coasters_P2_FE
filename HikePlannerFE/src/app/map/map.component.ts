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
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})


export class MapComponent implements OnInit, OnDestroy {
  public view : any = null;
  public selected: any = null;
  public id: number = 0;
  public customShape: any = null;
  public graphicsLayer = new GraphicsLayer();

  constructor(private mapService: MapService, private router: Router) { 

  }

  @ViewChild('mapViewNode', { static: true }) private mapViewEl : any;

  initializeMap() : Promise<any> {
    const container = this.mapViewEl.nativeElement;
    
    esriConfig.apiKey = environment.MAP_KEY;
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
    };

    const trailheadsLayer = new FeatureLayer({
      url: "https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_RecreationOpportunities_01/MapServer",
      outFields: ["*"],
      popupTemplate: popupTrailheads
    });
    map.add(trailheadsLayer);

    const popupTrails = {
      "title": "{TRAIL_NAME}"
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
        options.target.scale = 20000;
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

    return this.view.when();
  }

  GoToAddActivity(): any {
    this.router.navigate(['addActivity'], {queryParams: {id: this.selected.attributes.OBJECTID, name: this.selected.attributes.TRAIL_NAME}});
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
}
