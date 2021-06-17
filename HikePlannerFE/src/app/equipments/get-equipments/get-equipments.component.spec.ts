import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetEquipmentsComponent } from './get-equipments.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HPApiService } from 'src/app/services/hpapi.service';
import { equipment } from 'src/app/models/equipment';
import { AuthService } from '@auth0/auth0-angular';

//  constructor(private equipmentService: HPApiService, private router: Router, public auth: AuthService) { }
describe('GetRestaurantsComponent', () => {
  let component: GetEquipmentsComponent;
  let fixture: ComponentFixture<GetEquipmentsComponent>;
  let router: Router;
  let service: HPApiService;
  let auth: AuthService;

  class MockHPApiService
  {
    GetAllEquipments() {};
    DeleteEquipment(equipmentId: number) {};
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [ GetEquipmentsComponent ],
      providers: [
        {provide: HPApiService, useClass: MockHPApiService}
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    service = TestBed.inject(HPApiService);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetEquipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
