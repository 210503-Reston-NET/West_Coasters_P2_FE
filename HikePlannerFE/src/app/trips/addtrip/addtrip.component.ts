import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { activity } from 'src/app/models/activity';
import { HPApiService } from 'src/app/services/hpapi.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FormGroup, FormControl, FormsModule
} from '@angular/forms';


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

  tripDateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  constructor(private tripServices: HPApiService, private route: ActivatedRoute, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.tripServices.GetActivity(params.id).then(
          result => {
            this.newActivity = result;
            console.log(result, 'we got the activity');
          }
        );
      }
    );
  }
  onSubmit() :void{
    if(window.sessionStorage.getItem('currentUserId'))
    {
      this.newTrip.activityId = this.newActivity.id;
      this.newTrip.startDate = this.tripDateRange.value.start;
      this.newTrip.endDate = this.tripDateRange.value.end;
      this.newTrip.creator = window.sessionStorage.getItem('currentUserId') ?? '';
      console.log("i have activity id to store to trips",this.newTrip);
                this._snackBar.open('Your trip has been successfully scheduled', 'dismiss');

      // this.tripServices.AddTrip(this.newTrip).then(
      //   result => {
      //     alert(`your trip has been scheduled`);
      //     this._snackBar.open('Your trip has been successfully scheduled', 'dismiss');
      //     this.GoToTrips(result.activityId);
      //   }
      // )
    }
  }


  GoToTrips(activityId: number): void{
    console.log(activityId);
    this.router.navigate([`gettrips`],{queryParams: { id: activityId }})
  }
}
