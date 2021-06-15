import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { activity } from '../models/activity';
import { participant } from '../models/participant';
import { trip } from '../models/trip';
import { trips } from '../models/trips';
import { HPApiService } from '../services/hpapi.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  currentUserId: string = "";

  //gather info for testing
  //tripId = 18
  //user
  //goodday@gmail.com
  //9f0250da-ea47-4bcc-984e-a5c97b3a4872

  /*
   what i need:
    activity.trailHead
    trip.startDate
    trip.endDate
    trip.creator => user.name
    participant
  */
  tripInvite : trip[] = [];
  map = new Map<activity, trip[]>();
  tripData : any = [];

  constructor(public auth: AuthService, private hpService: HPApiService,  private router: Router) {
    this.currentUserId = window.sessionStorage.getItem('currentUserId') ?? '';
  }

  ngOnInit():void{
    console.log(this.auth);
    this.hpService.GetSharedTrips(this.currentUserId).then(
      result => {
        result.filter(r => r.participants?.filter(p => {
          p.accept == false && p.userId == this.currentUserId;
        }))
        this.tripInvite = result;
        this.tripData = result;
        console.log("tripData -> ",this.tripData);
      })
  }

  SeeInvite(): void {
    //get trips by shared/userId and filter accept = true
  }

  AcceptInvite(trip : trip): void {
    //update participant table and set accept as true
    if (trip.participants) {
      let target : participant | undefined | null = trip?.participants?.find((p: { userId: string; }) => p.userId === this.currentUserId);
      if (target) {
        let toUpdate: participant = {
          id: target.id,
          userId: this.currentUserId,
          accept: true,
          tripId: trip.id
        }
        this.hpService.UpdateParticipant(toUpdate).then(
          result => {
            alert("You accepted!");
          }
        )
        this.ngOnInit();
      }
    }
  }

  RejectInvite(tripId : number): void {
    let trip = this.tripData.find((t: { id: number; }) => t.id == tripId);
    let target : participant | undefined | null = trip?.participants?.find((p: { userId: string; }) => p.userId === this.currentUserId);
    if (target?.id) {
      let id : number = target?.id;
      this.hpService.DeleteParticipant(id).then(
        result => {
          alert("Invitation declined");
        }
      );
      this.ngOnInit();
    }
  }

}

/*
disclaimer:
please don't invite a same user multiple times, we don't have validation for checking it.

notes:
removed profile icon for testing because the icon is too big on my end when I open my console.
        <img
          [src]="user.picture"
          alt="User's profile picture"
          class="img-fluid rounded-circle profile-picture"
        />

*/
