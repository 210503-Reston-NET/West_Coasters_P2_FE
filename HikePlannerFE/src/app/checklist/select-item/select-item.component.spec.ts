import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectItemComponent } from './select-item.component';

import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HPApiService } from 'src/app/services/hpapi.service';
import { checklist } from 'src/app/models/checklist';
import { checklistItem } from 'src/app/models/checklistItem';

describe('SelectItemComponent', () => {
  let component: SelectItemComponent;
  let fixture: ComponentFixture<SelectItemComponent>;
  let router: Router;
  let service: HPApiService;
  let route : ActivatedRoute;

  class MockHPApiService
  {
    GetChecklist(id : number): Promise<any> {
      return new Promise<void>((resolve, reject) => {});
    };
    GetAllEquipments(): Promise<any> {
      return new Promise<void>((resolve, reject) => {});
    };
    AddChecklistItem(checklistItem : checklistItem) {};
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [ SelectItemComponent ],
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
    fixture = TestBed.createComponent(SelectItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
