import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { activity } from '../../models/activity';
import { HPApiService } from '../../services/hpapi.service';

@Component({
  selector: 'app-addactivity',
  templateUrl: './addactivity.component.html',
  styleUrls: ['./addactivity.component.css']
})
export class AddactivityComponent implements OnInit {
  newActivity: activity = {
    id: 0,
    name: '',
    notes: '',
    tarilId: 0,
    trailHead: '',
    creator: '',
    trips: []
  }
  constructor(private activityService: HPApiService, private router
    : Router) { }

  ngOnInit(): void {
  }
  onSubmit(): void{
    this.newActivity.tarilId = 26514754;
    this.newActivity.trailHead = "Eagle Falls Trailhead";
    this.newActivity.creator = "5f6e429d-2a77-48b6-a1b7-67822955476a";
    this.activityService.AddAnActivity(this.newActivity)
    .then(
      result => {
        alert(`${result.name} added to activity`);
        this.GoToActivies();
      }
    )
  }
  GoToActivies() {
    this.router.navigate(['activities'])
  }
}
