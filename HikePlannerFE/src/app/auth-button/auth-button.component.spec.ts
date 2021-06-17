import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthButtonComponent } from './auth-button.component';
import { AuthService } from '@auth0/auth0-angular';
import { HPApiService } from 'src/app/services/hpapi.service';
import { user } from 'src/app/models/user';

//  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService, private hpApi: HPApiService) {}
describe('AuthButtonComponent', () => {
  let component: AuthButtonComponent;
  let fixture: ComponentFixture<AuthButtonComponent>;
  let auth : AuthService;
  let service: HPApiService;

  class MockHPApiService
  {
    FindUserByEmail(userId : string): Promise<any> {
      return new Promise<void>((resolve, reject) => {});
    };
    CreateUser(user : user) {}
  }

  class MockAuthService {

  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthButtonComponent ],
      providers: [
        {provide: HPApiService, useClass: MockHPApiService},
        {provide: AuthService, useClass: MockAuthService}
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

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
