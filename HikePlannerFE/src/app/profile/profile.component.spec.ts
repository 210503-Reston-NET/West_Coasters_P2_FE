import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HPApiService } from 'src/app/services/hpapi.service';
import { participant } from 'src/app/models/participant'
import { AuthService } from '@auth0/auth0-angular';

//  constructor(public auth: AuthService, private hpService: HPApiService,  private router: Router)
describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let router: Router;
  let service: HPApiService;
  let auth : AuthService;

  class MockHPApiService
  {
    GetSharedTrips(userId : string): Promise<any> {
      return new Promise<void>((resolve, reject) => {});
    };
    GetUserById(userId : string): Promise<any> {
      return new Promise<void>((resolve, reject) => {});
    };
    UpdateParticipant(participant : participant){};

    DeleteParticipant(id: number) {};
  }

  class MockAuthService {

  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [ ProfileComponent ],
      providers: [
        {provide: HPApiService, useClass: MockHPApiService},
        {provide: AuthService, useClass: MockAuthService}
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    auth = TestBed.inject(AuthService);
    service = TestBed.inject(HPApiService);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
