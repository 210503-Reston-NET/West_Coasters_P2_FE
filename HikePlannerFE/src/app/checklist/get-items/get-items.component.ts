import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { checklist } from 'src/app/models/checklist';
import { checklistItem } from 'src/app/models/checklistItem';
import { HPApiService } from 'src/app/services/hpapi.service';

@Component({
  selector: 'app-get-items',
  templateUrl: './get-items.component.html',
  styleUrls: ['./get-items.component.css', '../checklist.css']
})

export class GetItemsComponent implements OnInit {
  target: checklist = {
    id: 0,
    name: '',
    dateCreated: null,
    creator: '',
    checklistItems: []
  }


  constructor(private itemService : HPApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.itemService.GetChecklist(params.checklistId).then(
          result => {
            this.target = result;
          }
          );

        }
      )
    }
    AddItem(checklistId: number) {
      this.router.navigate(['addItem'], { queryParams: { id: checklistId } });
    }
}
