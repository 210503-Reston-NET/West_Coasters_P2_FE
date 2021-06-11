import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { activity } from 'src/app/models/activity';
import { HPApiService } from 'src/app/services/hpapi.service';

@Component({
  selector: 'app-addtrip',
  templateUrl: './addtrip.component.html',
  styleUrls: ['./addtrip.component.css']
})
export class AddtripComponent implements OnInit {
  newTrip = {
    id: 0,
    activityId: 0,
    startDate: 0,
    enDate: 0,
    distance: 0,
    creater: ""
  }
  newActivity: activity = {
    id: 0,
    name: '',
    notes: '',
    tarilId: 0,
    trailHead: '',
    creator: '',
    trips: []
  }
  constructor(private tripServices: HPApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit() :void{
    this.route.queryParams.subscribe(
      params => {
        this.tripServices.GetActivity(params.id).then(
          result => {
            this.newActivity = result;
          }
        );
      }
    );
    this.newTrip.activityId = this.newActivity.id;
    this.newTrip.startDate = Date.now();
    this.newTrip.enDate = Date.now();
    this.newTrip.creater = "5f6e429d-2a77-48b6-a1b7-67822955476a";
    console.log("i have activity id to store to trips",this.newActivity.id);
    this.tripServices.AddTrip(this.newTrip).then(
      result => {
        alert(`your trip scheduled`);
        this.GoToTrips(result.activityId);
      }
    )
  }
  GoToTrips(activityId: number): void{
    console.log(activityId);
    this.router.navigate(['trips'],{queryParams: { id: activityId }})
  }
}
