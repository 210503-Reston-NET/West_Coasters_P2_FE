import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetItemsComponent } from './get-items.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HPApiService } from 'src/app/services/hpapi.service';
import { checklist } from 'src/app/models/checklist';

describe('GetItemsComponent', () => {
  let component: GetItemsComponent;
  let fixture: ComponentFixture<GetItemsComponent>;
  let router: Router;
  let service: HPApiService;
  let route : ActivatedRoute;

  class MockHPApiService
  {
    GetChecklist(id : number): Promise<any> {
      return new Promise<void>((resolve, reject) => {});
    };
    DeleteChecklistItem(id: number, checklistId : number) {};
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [ GetItemsComponent ],
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
    fixture = TestBed.createComponent(GetItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
