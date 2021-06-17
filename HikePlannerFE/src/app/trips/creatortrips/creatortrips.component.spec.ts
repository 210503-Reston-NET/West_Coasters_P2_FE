import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatortripsComponent } from './creatortrips.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HPApiService } from 'src/app/services/hpapi.service';
import { MapService } from 'src/app/services/map.service';

describe('CreatortripsComponent', () => {
  let component: CreatortripsComponent;
  let fixture: ComponentFixture<CreatortripsComponent>;
  let router: Router;
  let service: HPApiService;

  class MockHPApiService
  {
    GetTripsByCreator(id: string):Promise<any> {
      return new Promise<any>((resolve, reject) => {

      })
    };
    GetSharedTrips(id: string):Promise<any> {
      return new Promise<any>((resolve, reject) => {

      })
    };
    DeleteTrip(id : number){}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [ CreatortripsComponent ],
      providers: [
        {provide: HPApiService, useClass: MockHPApiService},
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    service = TestBed.inject(HPApiService);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatortripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
