import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private currentUserSource: BehaviorSubject<any> = new BehaviorSubject({name: 'default'});
  currentUser = this.currentUserSource.asObservable();
  constructor() { }

  setCurrentUser(user: any) {
    console.log('setting current user...', user);
    this.currentUserSource.next({something: 'else'});
  }
}
