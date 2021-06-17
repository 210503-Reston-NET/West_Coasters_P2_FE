import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { activity } from 'src/app/models/activity';
import { trips } from 'src/app/models/trips';
import { HPApiService } from 'src/app/services/hpapi.service';

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
  selector: 'app-gettrips',
  templateUrl: './gettrips.component.html',
  styleUrls: ['./gettrips.component.css']
})
export class GettripsComponent implements OnInit {
  trips: trips[] = [];
  loader = false;
  tripId = 0;
  activity : activity = {
    id : 0,
    name: '',
    notes: '',
    trailId: 0,
    trailHead: '',
    creator: '',
    trips: []
  }
  constructor(private tripServices: HPApiService, private route: ActivatedRoute, private router: Router, private mapService: MapService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.tripId = params.id;
        this.tripServices.GetActivity(this.tripId).then(
          result => {
            if(result){
              this.loader = false;
            }else{
              this.loader = true;
            }
            this.activity = result;
            this.initializeMap();
            this.tripServices.GetTripsByActivityId(this.tripId).then(
              (tripResult) => 
              {
                this.trips = tripResult;
              });
      });
    });
  }
  DeleteTrip(tripId: number, tripDate: string){
    this.tripServices.DeleteTrip(tripId).then(
      ()=>{
        alert(`trip scheduled on ${tripDate.toString()} has been deleted`);
        this.tripServices.GetTripsByActivityId(this.tripId).then(
          result => this.trips = result
        );
      }
    )
  }
  AddTrips(activityId: number){
    this.router.navigate(['addtrip'], { queryParams: { id: activityId }})
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
          this.mapService.GetTrailById(this.activity.trailId).then( result => {
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
