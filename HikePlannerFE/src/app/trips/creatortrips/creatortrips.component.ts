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
  trips: trips[] = [];
  tripInvite : trip[] = [];
  constructor(private hpApi: HPApiService, private router: Router) { }
  currentUserId = window.sessionStorage.getItem('currentUserId') ?? ''

  ngOnInit(): void {
    this.hpApi.GetTripsByCreator(this.currentUserId).then(
      result => this.trips = result
      )
      this.hpApi.GetSharedTrips(this.currentUserId).then(
        result => {
          result.filter(r => r.participants?.filter(p => p.accept == false))
          this.tripInvite = result;
         // console.log(currentUserId);
          console.log("tripInvite -> ",result);
          console.log("tripInvite -> ",this.tripInvite);
  
        }
      );
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

