import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetChecklistsComponent } from './get-checklists.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HPApiService } from 'src/app/services/hpapi.service';
import { checklist } from 'src/app/models/checklist';

describe('GetChecklistsComponent', () => {
  let component: GetChecklistsComponent;
  let fixture: ComponentFixture<GetChecklistsComponent>;
  let router: Router;
  let service: HPApiService;

  class MockHPApiService
  {
    GetChecklistByUserId(id : string): Promise<any> {
      return new Promise<void>((resolve, reject) => {});
    };
    DeleteEquipment(id: number) {};
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [ GetChecklistsComponent ],
      providers: [
        {provide: HPApiService, useClass: MockHPApiService}
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    service = TestBed.inject(HPApiService);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetChecklistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
