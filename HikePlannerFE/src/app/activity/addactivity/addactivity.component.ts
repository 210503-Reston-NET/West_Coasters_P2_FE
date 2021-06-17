import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { activity } from '../../models/activity';
import { HPApiService } from '../../services/hpapi.service';

import Map from '@arcgis/core/Map';
import esriConfig from '@arcgis/core/config.js';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'; 
import Graphic from '@arcgis/core/Graphic';
import Polyline from '@arcgis/core/geometry/Polyline';
import { MapService } from '../../services/map.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-addactivity',
  templateUrl: './addactivity.component.html',
  styleUrls: ['./addactivity.component.css']
})
export class AddactivityComponent implements OnInit, OnDestroy {
  trail = {
    id: 0,
    name: ''
  };
  newActivity: activity = {
    id: 0,
    name: '',
    notes: '',
    trailId: this.trail.id,
    trailHead: this.trail.name,
    creator: '',
    trips: []
  }
  constructor(private activityService: HPApiService,private route: ActivatedRoute, private router: Router, private mapService:MapService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.trail.id = params.id;
        this.trail.name = params.name;
        this.initializeMap();
      }
    );
  }

  ngOnDestroy(): void {
    if (this.view) {
      // destroy the map view
      this.view.destroy();
    }
  }
  onSubmit(): void{
    if(window.sessionStorage.getItem('currentUserId'))
    {
      this.newActivity.creator = window.sessionStorage.getItem('currentUserId') ?? '';
      this.newActivity.trailId = this.trail.id;
      this.newActivity.trailHead = this.trail.name;
      this.activityService.AddAnActivity(this.newActivity)
      .then(
        result => {
          alert(`${result.name} added to activity`);
          this.GoToActivies();
        }
      )
    }
  }
  GoToActivies() {
    this.router.navigate(['activities'])
  }

  @ViewChild('activityMapDiv', { static: true }) private mapViewEl : any;
  public customShape: any = null;
  public graphicsLayer = new GraphicsLayer();
  public view : any = null;

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

    return this.view.when(
          this.mapService.GetTrailById(this.trail.id).then( result => {
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
          })
    );
  }
}
