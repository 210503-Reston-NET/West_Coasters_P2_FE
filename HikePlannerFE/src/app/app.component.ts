import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'HikePlannerFE';
  constructor(public auth: AuthService){}
  loader = false;
  ngOnInit(): void {
    this.loader = true;
    setTimeout(()=>{
      this.loader = false;
    }, 3000)
  }

}
