import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { checklist } from 'src/app/models/checklist';
import { HPApiService } from 'src/app/services/hpapi.service';

@Component({
  selector: 'app-get-checklists',
  templateUrl: './get-checklists.component.html',
  styleUrls: ['./get-checklists.component.css',  '../checklist.css']
})
export class GetChecklistsComponent implements OnInit {

  checklists: checklist[] = [];

  constructor(private checklistService : HPApiService, private router: Router) { }

  ngOnInit(): void {
    this.checklistService.GetAllChecklist().then(result => this.checklists = result);
  }

  GoToItem(checklistId: number) {
    this.router.navigate(['checklistItems'], { queryParams: { checklistId: checklistId } });
  }

  GoToAdd() {
    this.router.navigate(['addChecklist']);
  }

}
