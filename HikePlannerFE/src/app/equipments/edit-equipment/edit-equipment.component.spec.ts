import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEquipmentComponent } from './edit-equipment.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HPApiService } from 'src/app/services/hpapi.service';
import { equipment } from 'src/app/models/equipment';

describe('EditEquipmentComponent', () => {
  let component: EditEquipmentComponent;
  let fixture: ComponentFixture<EditEquipmentComponent>;
  let router: Router;
  let service: HPApiService;
  let route: ActivatedRoute

  class MockHPApiService
  {
    GetEquipment(id: number):Promise<any> {
      return new Promise<any>((resolve, reject) => {})
    };

    EditEquipment(equipment: equipment):Promise<any> {
      return new Promise<any>((resolve, reject) => {})
    };
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [ EditEquipmentComponent ],
      providers: [
        {provide: HPApiService, useClass: MockHPApiService}
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    service = TestBed.inject(HPApiService);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
