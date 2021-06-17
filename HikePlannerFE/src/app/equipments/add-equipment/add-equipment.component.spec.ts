import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEquipmentComponent } from './add-equipment.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HPApiService } from 'src/app/services/hpapi.service';
import { equipment } from 'src/app/models/equipment';

//  constructor(private equipmentService : HPApiService, private router: Router) { }
describe('AddEquipmentComponent', () => {
  let component: AddEquipmentComponent;
  let fixture: ComponentFixture<AddEquipmentComponent>;
  let router: Router;
  let service: HPApiService;

  class MockHPApiService
  {
    AddEquipment(equipment: equipment) {};
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [ AddEquipmentComponent ],
      providers: [
        {provide: HPApiService, useClass: MockHPApiService}
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    service = TestBed.inject(HPApiService);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
