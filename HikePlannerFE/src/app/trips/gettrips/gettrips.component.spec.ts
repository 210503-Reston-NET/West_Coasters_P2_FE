import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GettripsComponent } from './gettrips.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HPApiService } from 'src/app/services/hpapi.service';
import { MapService } from 'src/app/services/map.service';

//  constructor(private tripServices: HPApiService, private route: ActivatedRoute, private router: Router, private mapService: MapService) { }
describe('GettripsComponent', () => {
  let component: GettripsComponent;
  let fixture: ComponentFixture<GettripsComponent>;
  let router: Router;
  let service: HPApiService;
  let route: ActivatedRoute;
  let mapService: MapService;

  class MockHPApiService
  {
    GetActivity(id: number):Promise<any> {
      return new Promise<any>((resolve, reject) => {

      })
    };
    GetTripsByActivityId(id: number):Promise<any> {
      return new Promise<any>((resolve, reject) => {

      })
    };
  }

  class MockMapService
  {
    GetTrailById(id: number):Promise<any> {
      return new Promise<any>((resolve, reject) => {

      })
    };
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [ GettripsComponent ],
      providers: [
        {provide: MapService, useClass: MockMapService},
        {provide: HPApiService, useClass: MockHPApiService},
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    service = TestBed.inject(HPApiService);
    route = TestBed.inject(ActivatedRoute);
    mapService = TestBed.inject(MapService);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GettripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
