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
  tripInvite : trip[] = [];
  showTrips: string = 'all';
  allTrips: any[] = [];
  constructor(private hpApi: HPApiService, private router: Router) { }
  currentUserId = window.sessionStorage.getItem('currentUserId') ?? ''

  ngOnInit(): void {
    this.hpApi.GetTripsByCreator(this.currentUserId).then(
      result => {
        this.trips = result;
        console.log('only my trips',result);
      }
      
      )
      this.hpApi.GetSharedTrips(this.currentUserId).then(
        result => {
          result.filter(r => r.participants?.filter(p => p.accept == false));
          // console.log('shared results',result);
          this.allTrips = this.allTrips.concat(this.trips,result);
          console.log('shared results concat',this.allTrips);
        }
        );
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

