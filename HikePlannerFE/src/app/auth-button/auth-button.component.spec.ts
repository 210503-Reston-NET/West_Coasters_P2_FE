import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthButtonComponent } from './auth-button.component';
import { AuthService } from '@auth0/auth0-angular';
import { HPApiService } from 'src/app/services/hpapi.service';
import { user } from 'src/app/models/user';


import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


//  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService, private hpApi: HPApiService) {}
describe('AuthButtonComponent', () => {
  let component: AuthButtonComponent;
  let fixture: ComponentFixture<AuthButtonComponent>;
  let auth : AuthService;
  let service: HPApiService;
  let router: Router;


  class MockHPApiService
  {
    FindUserByEmail(userId : string): Promise<any> {
      return new Promise<void>((resolve, reject) => {});
    };
    CreateUser(user : user) {}
  }

  class MockAuthService {
    user$ = new Observable<any>();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ AuthButtonComponent ],
      providers: [
        {provide: HPApiService, useClass: MockHPApiService},
        {provide: AuthService, useClass: MockAuthService},
      ]
    })
    .compileComponents();

    auth = TestBed.inject(AuthService);
    service = TestBed.inject(HPApiService);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});



