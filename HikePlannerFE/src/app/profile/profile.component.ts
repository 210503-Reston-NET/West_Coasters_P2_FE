import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
  loader = true;
  currentUserId: string = "";
  tripData : any = [];

  constructor(public auth: AuthService, private hpService: HPApiService,  private router: Router) {
    this.currentUserId = window.sessionStorage.getItem('currentUserId') ?? '';
  }

  ngOnInit():void{
    if(this.currentUserId){
      this.loader = false;
    }
    console.log(this.auth.user$);
    if(this.auth.user$ != null){
      this.loader = false;
    }
    this.hpService.GetSharedTrips(this.currentUserId).then(
      result => {
        if(result){
          this.loader = false;
        }else{
          this.loader = true;
        }
        this.tripData = [];
        for(let trip of result) {
          if (trip.participants) {
            for (let p of trip.participants) {
              if (p.userId == this.currentUserId && p.accept == false) {
                this.tripData.push(trip);
                this.hpService.GetUserById(trip.creator).then(
                res => {
                  trip.user = res;
                })
                console.log("tripdata ->", this.tripData);
              }
            }
          }
        }
      })
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
