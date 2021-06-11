import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { activity } from 'src/app/models/activity';
import { HPApiService } from 'src/app/services/hpapi.service';

@Component({
  selector: 'app-getactivity',
  templateUrl: './getactivity.component.html',
  styleUrls: ['./getactivity.component.css']
})
export class GetactivityComponent implements OnInit {
  activities: activity[] = [];
  constructor(private activityService: HPApiService, private router: Router) { }

  ngOnInit(): void {
    this.activityService.GetAllActivities().then(
      result => this.activities = result
    );
  }
  GoToTrips(activityId: number) {
    this.router.navigate(['gettrips'], { queryParams: { id: activityId }});
  }
  DeleteActivity(activityId: number, activityName: string){
    if (confirm(`Are you sure you want to delete ${activityName}?`).valueOf()) {
        this.activityService.DeleteActivity(activityId).then(
          ()=>{
            alert(`${activityName} has been deleted`);
            this.activityService.GetAllActivities().then(
              result => this.activities = result
            );
          }
        )
    }
  }

}
