import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { activity } from '../../models/activity';
import { HPApiService } from '../../services/hpapi.service';

@Component({
  selector: 'app-addactivity',
  templateUrl: './addactivity.component.html',
  styleUrls: ['./addactivity.component.css']
})
export class AddactivityComponent implements OnInit {
  trail = {
    id: 0,
    name: ''
  };
  newActivity: activity = {
    id: 0,
    name: '',
    notes: '',
    trailId: this.trail.id,
    trailHead: this.trail.name,
    creator: '',
    trips: []
  }
  constructor(private activityService: HPApiService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(
      params => {
        this.trail.id = params.id;
        this.trail.name = params.name;
      }
    );
  }
  onSubmit(): void{
    if(window.sessionStorage.getItem('currentUserId'))
    {
      this.newActivity.creator = window.sessionStorage.getItem('currentUserId') ?? '';
      this.newActivity.trailId = this.trail.id;
      this.newActivity.trailHead = this.trail.name;
      this.activityService.AddAnActivity(this.newActivity)
      .then(
        result => {
          alert(`${result.name} added to activity`);
          this.GoToActivies();
        }
      )
    }
  }
  GoToActivies() {
    this.router.navigate(['activities'])
  }
}
