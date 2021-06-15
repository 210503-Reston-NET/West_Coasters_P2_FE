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
  //user: string = "";

  constructor(private checklistService : HPApiService, private router: Router) {
    //this.user = window.sessionStorage.getItem('currentUserId') ?? '';
  }
  //currentUserId = window.sessionStorage.getItem('currentUserId') ?? '';

  ngOnInit(): void {
    let currentUserId = window.sessionStorage.getItem('currentUserId') ?? '';
    this.checklistService.GetChecklistByUserId(currentUserId)
      .then(
        result => {this.checklists = result
        console.log(result);
        }
      );

  }

  GoToItem(checklistId: number) {
    this.router.navigate(['checklistItems'], { queryParams: { checklistId: checklistId } });
  }

  GoToAdd() {
    this.router.navigate(['addChecklist']);
  }
  //Not such yet.
  GoToEdit(checkListId: number) {
    this.router.navigate(['editChecklist'], { queryParams: { id: checkListId } });
  }

  DeleteChecklist(checklistId: number, name: string) {

    //event.stopPropagation();
    if (confirm(`Are you sure you want to delete ${name}?`).valueOf()) {
      let currentUserId = window.sessionStorage.getItem('currentUserId') ?? '';
      this.checklistService.DeleteChecklist(checklistId).then(
        () => {
          alert(`${name} has been deleted`);
          this.checklistService.GetChecklistByUserId(currentUserId).then(
            result => {
              this.checklists = result;
            }
          )
        }
      )
    }
  }

}
