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
<<<<<<< HEAD
=======
  newTrip =  {
    id: 0,
    activityId: 0,
    startDate: '',
    endDate: '',
    distance: 0,
    creator: "",
    checklistId: 0
  }
>>>>>>> 3f3fc961caee3e8b4b03e409d38fa3ed199a27dd
  newActivity: activity = {
    id: 0,
    name: '',
    notes: '',
    trailId: 0,
    trailHead: '',
    creator: '',
    trips: []
  }
<<<<<<< HEAD
  newTrip = {
    id: 0,
    activityId: 0,
    startDate: new Date().toJSON(),
    endDate: new Date().toJSON(),
    distance: 0,
    creator: "",
    activities: this.newActivity
  }
  constructor(private tripServices: HPApiService, private route: ActivatedRoute, private router: Router) { }
=======
>>>>>>> 3f3fc961caee3e8b4b03e409d38fa3ed199a27dd

  tripDateRange = {
    start: '',
    end: ''
  };

  userChecklists:any[] = [];

  constructor(private tripServices: HPApiService, private route: ActivatedRoute, private router: Router, private _snackBar: MatSnackBar, private mapService: MapService) { }

  currentUserId = window.sessionStorage.getItem('currentUserId') ?? '';
  ngOnInit(): void {
    //get all checklist created by users to display on select
    this.tripServices.GetChecklistByUserId(this.currentUserId).then(
      result => {
        this.userChecklists = result;
        console.log('checklist', result);
      }
    );
    this.route.queryParams.subscribe(
      params => {
        this.tripServices.GetActivity(params.id).then(
          result => {
            this.newActivity = result;
<<<<<<< HEAD
=======
            console.log(result, 'we got the activity');
            this.initializeMap(result.trailId);
>>>>>>> 3f3fc961caee3e8b4b03e409d38fa3ed199a27dd
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
<<<<<<< HEAD
=======
      console.log("i have activity id to store to trips",this.newTrip);

>>>>>>> 3f3fc961caee3e8b4b03e409d38fa3ed199a27dd
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
