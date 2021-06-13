import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { activity } from 'src/app/models/activity';
import { HPApiService } from 'src/app/services/hpapi.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  selector: 'app-addtrip',
  templateUrl: './addtrip.component.html',
  styleUrls: ['./addtrip.component.css']
})
export class AddtripComponent implements OnInit {
  newTrip = {
    id: 0,
    activityId: 0,
    startDate: '',
    endDate: '',
    distance: 0,
    creator: ""
  }
  newActivity: activity = {
    id: 0,
    name: '',
    notes: '',
    trailId: 0,
    trailHead: '',
    creator: '',
    trips: []
  }

  tripDateRange = {
    start: '',
    end: ''
  };
  constructor(private tripServices: HPApiService, private route: ActivatedRoute, private router: Router, private _snackBar: MatSnackBar, private mapService: MapService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.tripServices.GetActivity(params.id).then(
          result => {
            this.newActivity = result;
            console.log(result, 'we got the activity');
            this.initializeMap(result.trailId);
          }
        );
      }
    );
  }
  onSubmit() :void{
    if(window.sessionStorage.getItem('currentUserId'))
    {
      this.newTrip.activityId = this.newActivity.id;
      this.newTrip.startDate = this.tripDateRange.start;
      this.newTrip.endDate = this.tripDateRange.end;
      this.newTrip.creator = window.sessionStorage.getItem('currentUserId') ?? '';
      console.log("i have activity id to store to trips",this.newTrip);
      console.log("date range",this.tripDateRange);

      this.tripServices.AddTrip(this.newTrip).then(
        result => {
          this._snackBar.open('Your trip has been successfully scheduled', 'Dismiss');
          this.GoToTrips(result.activityId);
        }
      )
    }
  }

  @ViewChild('activityMapDiv', { static: true }) private mapViewEl : any;
  public customShape: any = null;
  public graphicsLayer = new GraphicsLayer();
  public view : any = null;

  initializeMap(id: number) : Promise<any> {
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
          this.mapService.GetTrailById(id).then(result => {
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


  GoToTrips(activityId: number): void{
    console.log(activityId);
    this.router.navigate([`gettrips`],{queryParams: { id: activityId }})
  }
}
