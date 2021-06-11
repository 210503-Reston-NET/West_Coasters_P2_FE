import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private currentUser: any = {};
  constructor() { }

  getCurrentUser() {
    console.log('getting current user...');
    return this.currentUser;
  }

  setCurrentUser(user: any) {
    console.log('setting current user...', user);
    this.currentUser = user;
  }
}
