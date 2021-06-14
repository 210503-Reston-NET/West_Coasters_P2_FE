import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { checklist } from 'src/app/models/checklist';
import { checklistItem } from 'src/app/models/checklistItem';
import { equipment } from 'src/app/models/equipment';
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
  //checklistId : number = 0;
  isShow : boolean = false;

  //map : Map<checklistItem, equipment> |null | undefined = new Map<equipment, checklistItem>();

  items: checklistItem[] = [];
  constructor(private itemService : HPApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.itemService.GetChecklist(params.checklistId).then(
          result => {
            this.target = result;
            //this.checklistId = result.id;
            if (result.checklistItems?.length) {
              this.isShow = true;
            }
          }
          )
        }
      )
    }

    SelectItem(checklistId: number) {
      this.router.navigate(['selectItem'], { queryParams: { id: checklistId } });
    }

    DeleteChecklist(id: number, checklistId : number) {

      //event.stopPropagation();
      if (confirm(`Are you sure you want to delete it?`).valueOf()) {
        this.itemService.DeleteChecklistItem(checklistId, id).then(
          () => {
            alert(`this quantiy has been deleted`);
            this.itemService.GetChecklist(checklistId).then(
              result => {
                this.target = result;
              }
            )
          }
        )
      }
    }

    GoToAll() {
      this.router.navigate(['checklists'])
    }
}
