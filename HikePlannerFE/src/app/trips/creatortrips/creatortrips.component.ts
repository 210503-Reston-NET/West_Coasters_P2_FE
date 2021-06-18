import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trip } from 'src/app/models/trip';
import { trips } from 'src/app/models/trips';
import { HPApiService } from 'src/app/services/hpapi.service';

@Component({
  selector: 'app-creatortrips',
  templateUrl: './creatortrips.component.html',
  styleUrls: ['./creatortrips.component.css']
})
export class CreatortripsComponent implements OnInit {
  trips: any[] = [];
  loader = true;
  tripInvite : trip[] = [];
  showTrips: string = 'all';
  allTrips: any[] = [];
  constructor(private hpApi: HPApiService, private router: Router) { }
  currentUserId = window.sessionStorage.getItem('currentUserId') ?? ''

  ngOnInit(): void {
    this.hpApi.GetTripsByCreator(this.currentUserId).then(
      result => {
        if(result){
          this.loader = false;
        }
        this.trips = result;
        console.log('only my trips',result);
      }
      
      )
      this.hpApi.GetSharedTrips(this.currentUserId).then(
        result => {
          if(result){
            this.loader = false;
          }
          // result.filter(r => r.participants?.filter(p => p.accept == false));
          if(this.trips.length > 0) {
            //if this user has created some trips.. then add those to the all Trips too
            this.allTrips = this.allTrips.concat(this.trips);
          }
          this.allTrips = this.allTrips.concat(result);
          console.log('shared results concat',this.allTrips);
        }
        );
        console.log("Loader is",this.loader);
      console.log('concatinated trips oninit',this.allTrips);
    }
    toggleViewTripList():void {
      if(this.showTrips == 'all'){
        this.showTrips = 'onlymine'
      }else{
        this.showTrips = 'all';
      }
      console.log('show trips flag',this.showTrips);
    }
    TripDetails(tripId: number,activitytrailId: number, activityId: number) : void {
      this.router.navigate(['tripdetails'], {queryParams:{id: tripId, activitytrailId: activitytrailId, activityId: activityId}});
    }
    DeleteTrip(tripId: number, tripDate: string){
      this.hpApi.DeleteTrip(tripId).then(
        ()=>{
          alert(`trip scheduled on ${tripDate.toString()} has been deleted`);
          this.hpApi.GetTripsByCreator(this.currentUserId).then(
            result => this.trips = result
            );
          }
          )
        }
}

