import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import Map from '@arcgis/core/Map';
import esriConfig from '@arcgis/core/config.js';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'; 
import Graphic from '@arcgis/core/Graphic';
import Polyline from '@arcgis/core/geometry/Polyline';
import { environment } from 'src/environments/environment';
import { MapService } from 'src/app/services/map.service';
import { HPApiService } from 'src/app/services/hpapi.service';
import { checklist } from 'src/app/models/checklist';
import { participant } from 'src/app/models/participant';
import { MatSnackBar } from '@angular/material/snack-bar';
import { activity } from 'src/app/models/activity';

@Component({
  selector: 'app-tripdetails',
  templateUrl: './tripdetails.component.html',
  styleUrls: ['./tripdetails.component.css']
})
export class TripdetailsComponent implements OnInit {
  tripId = 0;
  actTailID = 0;
  activityId= 0;
  checklist: checklist = {
    id: 0,
    name: '',
    dateCreated: null,
    creator: '',
    checklistItems: []
  }
  emailToSearch = "";
  foundUser: any = null;
  participants: participant[] = [];
  participantsInfo: any[] = [];
  tripDetail: any = {};
  activityDetail: any = {};
  currentUserId = window.sessionStorage.getItem('currentUserId');

  constructor(private route: ActivatedRoute,private mapService: MapService, private hpApi: HPApiService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      param =>{
        this.actTailID = param.activitytrailId;
        this.activityId = param.activityId;
        this.tripId = param.id;
        this.hpApi.GetTripById(this.tripId).then(
          (result) => {
            this.tripDetail = result;
            this.getChecklistById(this.tripDetail.checklistId);
          }
        );
        this.hpApi.GetActivity(this.activityId).then((result) => {
          this.activityDetail = result;
        });
        this.fetchParticipants();
        this.initializeMap();
        
      } 
    );
  }
  getChecklistById(id: number){
    console.log('Checklist function works', id);
    this.hpApi.GetChecklist(id).then(
      res => {
        if(res != null){
          if(res.checklistItems != null){
            this.checklist = res;
            console.log('Checklist on details page',res);
          }
        }
        
        
      }
    )
  }

  fetchParticipants() {
    this.hpApi.GetParticipants(this.tripId).then(
      (result) => {
        this.participants = result;
        this.participantsInfo = [];
        this.participants.forEach(person => {
          this.hpApi.GetUserById(person.userId).then(
            userfound => {
              this.participantsInfo.push(
                {
                  "user": userfound,
                  "accept": person.accept 
                });
            }
          )
        });
      }
    )
  }

  SearchUserByEmail() {
    this.hpApi.FindUserByEmail(this.emailToSearch).then(
      (result) => {
        this.foundUser = result;
        console.log(this.foundUser);
        if(result !== null) {
          if(this.participants.find(person => person.userId == result.userId))
          {
            this.foundUser.exists = true;
            this._snackBar.open("This person has already been invited!", "Dismiss", { verticalPosition: 'top' });
          }
          if(window.sessionStorage.getItem('currentUserId') == this.foundUser.userId)
          {
            this.foundUser.exists = true;
            this._snackBar.open("You can't invite yourself to your own trip :/", "Dismiss", {verticalPosition: 'top'});
          }
        } else {
          this._snackBar.open("User not found :(", "Dismiss", { verticalPosition: 'top' });
        }
      }
    )
  }

  InviteUser() {
    const participantToAdd: participant = {
      id: 0,
      userId: this.foundUser.userId,
      accept: false,
      tripId: this.tripId
    }
    this.hpApi.AddParticipant(participantToAdd).then(
      result => {
        this._snackBar.open(`${this.foundUser.name} was invited successfully!`, 'Dismiss', {
          verticalPosition: 'top'
        });
        this.fetchParticipants();
        this.foundUser = null;
        this.emailToSearch = "";
      }
    )
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
          this.mapService.GetTrailById(this.actTailID).then( result => {
            // console.log('it worked!!', result);
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
