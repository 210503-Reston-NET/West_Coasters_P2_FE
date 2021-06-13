import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { HPApiService } from '../services/hpapi.service';
import { user } from '../models/user';
@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.css']
})
export class AuthButtonComponent implements OnInit {

  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService, private hpApi: HPApiService) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((result) => {
      console.log('subscribe triggered', result);
      if(result?.email) {
        //user logged in
        this.hpApi.FindUserByEmail(result.email).then((userResult) =>{
          //user exists in our table, set the session to the user's id
          if(userResult) {
            console.log('we found the user in our table', userResult);
            window.sessionStorage.setItem('currentUserId', userResult.userId);
          } else {
            console.log("we didn't find a user so we're creating one")
            //add new user here with the email
            if(result.email && result.name){
              const userToAdd: user = {
                userId: '',
                email: result.email,
                name: result.name,
                password: '',
                addressId: 0,
                phone: ''
              };
              this.hpApi.CreateUser(userToAdd).then((result)=> {
                console.log('we came back from adding user!', result);
                window.sessionStorage.setItem('currentUserId', result.userId);
              });
            }
          }
          }).catch(() => {
            console.log('something went wrong');
          });
      } else {
        //user logged out
        window.sessionStorage.removeItem('currentUserId');
      }
    });
  }
  loginWithRedirect(): void {
    this.auth.loginWithRedirect({ screen_hint: 'signup' });
  }
  logout(): void {
    this.auth.logout({ returnTo: this.document.location.origin });
  }
}
