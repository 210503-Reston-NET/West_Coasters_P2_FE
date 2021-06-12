import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { checklist } from 'src/app/models/checklist';
import { HPApiService } from 'src/app/services/hpapi.service';

@Component({
  selector: 'app-add-checklist',
  templateUrl: './add-checklist.component.html',
  styleUrls: ['./add-checklist.component.css', '../checklist.css']
})
export class AddChecklistComponent implements OnInit {
  new: checklist = {
    id: 0,
    name: '',
    dateCreated: new Date(),
    creator: '5f6e429d-2a77-48b6-a1b7-67822955476a', //will circle back
    checklistItems: null
  }

  constructor(private checklistService : HPApiService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.checklistService.AddChecklist(this.new)
      .then(
        result => {
          // alert(`${result.name} has been added`);
          // //this.GoToAll();
          this.router.navigate(['checklistItems'], { queryParams: { checklistId: result.id } });
        }
      )
  }
  // GoToAll() {
  //   this.router.navigate(['checklists'])
  // }
  //<i class="fa fa-arrow-circle-left" aria-hidden="true" (click)='GoToAll()'></i>

}
