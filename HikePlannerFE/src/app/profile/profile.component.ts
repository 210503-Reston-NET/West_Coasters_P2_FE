import { Component, OnInit } from '@angular/core';
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

  user: string = "";

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

  constructor(public auth: AuthService, private hpService: HPApiService) {
    this.user = window.sessionStorage.getItem('currentUserId') ?? '';

  }

  ngOnInit():void{
    console.log(this.auth);


    this.hpService.GetSharedTrips(this.user).then(
      result => {
        result.filter(r => r.participants?.filter(p => p.accept == false))
        this.tripInvite = result;
       // console.log(currentUserId);
        console.log("tripInvite -> ",result);
        console.log("tripInvite -> ",this.tripInvite);

      }
    );

    // this.tripInvite.forEach(t => {
    //   this.hpService.GetActivity(t.activityId).then(
    //     result => {
    //       this.map.set(result, this.tripInvite);
    //       console.log(this.map);
    //     }
    //   )
    // })

  }

  SeeInvite(): void {
    //get trips by shared/userId and filter accept = true
  }

  AcceptInvite(tripId : number): void {
    //update participant table and set accept as true
    let currentUserId = window.sessionStorage.getItem('currentUserId') ?? '';

    let trip = this.tripInvite.find(t => t.id == tripId);
    let target : participant | undefined | null = trip?.participants?.find(p => p.userId == currentUserId);
    if (target?.id) {
      let id : number = target?.id;
      this.hpService.DeleteParticipant(target.id);

      let newPart: participant = {
        id: target?.id,
        userId: currentUserId,
        accept: true,
        tripId: tripId
      }

      this.hpService.UpdateParticipant(newPart).then(
        result => {
          alert("You accepted!")
        }
      )
    }
  }

  RejectInvite(tripId : number): void {
    let trip = this.tripInvite.find(t => t.id == tripId);
    let currentUserId = window.sessionStorage.getItem('currentUserId') ?? '';

    let target : participant | undefined | null = trip?.participants?.find(p => p.userId == currentUserId);
    if (target?.id) {
      let id : number = target?.id;
      this.hpService.DeleteParticipant(target.id).then(
        result => {
          alert("Ok")
        }
      );
      //reload the page
      //don't show the div
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
