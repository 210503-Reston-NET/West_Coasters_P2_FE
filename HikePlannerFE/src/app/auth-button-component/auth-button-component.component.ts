import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button-component.component.html',
  styleUrls: ['./auth-button-component.component.css'],
})
export class AuthButtonComponentComponent implements OnInit {

  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}

  ngOnInit(): void {
  }
  loginWithRedirect(): void {
    this.auth.loginWithRedirect({ screen_hint: 'signup' });
  }
  logout(): void {
    this.auth.logout({ returnTo: this.document.location.origin });
  }

}
