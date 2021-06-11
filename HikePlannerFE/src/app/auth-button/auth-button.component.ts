import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.css']
})
export class AuthButtonComponent implements OnInit {

  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService, public user: UserService) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((result) => {
      if(result?.email) {
        //user logged in
        window.sessionStorage.setItem('currentUserId', result.email);
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