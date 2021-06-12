import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { activity } from 'src/app/models/activity';
import { trips } from 'src/app/models/trips';
import { HPApiService } from 'src/app/services/hpapi.service';

@Component({
  selector: 'app-gettrips',
  templateUrl: './gettrips.component.html',
  styleUrls: ['./gettrips.component.css']
})
export class GettripsComponent implements OnInit {
  trips: trips[] = [];
  activity : activity = {
    id : 0,
    name: '',
    notes: '',
    trailId: 0,
    trailHead: '',
    creator: '',
    trips: []
  }
  constructor(private tripServices: HPApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.tripServices.GetActivity(params.id).then(
          result => {
            this.activity = result;
            console.log('activity');
            this.tripServices.GetTripsByActivityId(params.id).then(
              (tripResult) => 
              {
                this.trips = tripResult;
                console.log('trips', tripResult);
              });
      });
    });
  }
  DeleteTrip(tripId: number, tripDate: string){
    this.tripServices.DeleteTrip(tripId).then(
      ()=>{
        alert(`trip scheduled on ${tripDate.toString()} has been deleted`);
        this.tripServices.GetTrips().then(
          result => this.trips = result
        );
      }
    )
  }
  AddTrips(activityId: number){
    this.router.navigate(['addtrip'], { queryParams: { id: activityId }})
  }
}
