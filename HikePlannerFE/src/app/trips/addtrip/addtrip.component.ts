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
  newActivity: activity = {
    id: 0,
    name: '',
    notes: '',
    trailId: 0,
    trailHead: '',
    creator: '',
    trips: []
  }
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

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.tripServices.GetActivity(params.id).then(
          result => {
            this.newActivity = result;
          }
        );
      }
    );
  }
  onSubmit() :void{
    if(window.sessionStorage.getItem('currentUserId'))
    {
      this.newTrip.activityId = this.newActivity.id;
      this.newTrip.startDate = new Date().toJSON();
      this.newTrip.endDate = new Date().toJSON();
      this.newTrip.creator = window.sessionStorage.getItem('currentUserId') ?? '';
      this.tripServices.AddTrip(this.newTrip).then(
        result => {
          alert(`your trip scheduled`);
          this.GoToTrips(result.activityId);
        }
      )
    }
  }
  GoToTrips(activityId: number): void{
    console.log(activityId);
    this.router.navigate([`gettrips`],{queryParams: { id: activityId }})
  }
}
