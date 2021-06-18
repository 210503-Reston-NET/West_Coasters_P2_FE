import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@auth0/auth0-angular';
import { participant } from 'src/app/models/participant';
import { HPApiService } from 'src/app/services/hpapi.service';
import { MapService } from 'src/app/services/map.service';

import { TripdetailsComponent } from './tripdetails.component';

describe('TripdetailsComponent', () => {
  let component: TripdetailsComponent;
  let fixture: ComponentFixture<TripdetailsComponent>;
  let router: Router;
  let service: HPApiService;
  let mapService: MapService;
  let _snackBar: MatSnackBar;
  class MockHPApiService
  {
    GetTripById(id : number): Promise<any> {
      return new Promise<void>((resolve, reject) => {});
    };
    getChecklistById(id : number): Promise<any> {
      return new Promise<void>((resolve, reject) => {});
    };
    GetActivity(id : number): Promise<any> {
      return new Promise<void>((resolve, reject) => {});
    };
    GetParticipants(id : number): Promise<any> {
      return new Promise<void>((resolve, reject) => {});
    };
    GetUserById(id : string): Promise<any> {
      return new Promise<void>((resolve, reject) => {});
    };
    FindUserByEmail(id : string): Promise<any> {
      return new Promise<void>((resolve, reject) => {});
    };
    AddParticipant(participant : participant){};
  }

  class MockMapService
  {
    GetTrailById(id: number):Promise<any> {
      return new Promise<any>((resolve, reject) => {

      })
    };
  }
  class MockMatSnackBar{

  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        FormsModule
      ],
      declarations: [ TripdetailsComponent ],
      providers:[
        {provide: HPApiService, useClass: MockHPApiService},
        {provide: MapService, useClass: MockMapService},
        {provide: MatSnackBar, useClass: MockMatSnackBar}
      ]
    })
    .compileComponents();
    router = TestBed.inject(Router);
    service = TestBed.inject(HPApiService);
    mapService = TestBed.inject(MapService);
    _snackBar = TestBed.inject(MatSnackBar);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('UserId should define on ngOnInit', () => {
    component.ngOnInit();
    expect(component.currentUserId).not.toBeUndefined;
  });

  it('Should have tripDetail ngOnInit', () => {
    component.ngOnInit();
    expect(component.tripDetail).not.toBeUndefined;
  });

});
