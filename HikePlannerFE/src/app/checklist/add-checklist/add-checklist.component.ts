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
    creator: '', //will circle back
    checklistItems: null
  }

  constructor(private checklistService : HPApiService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.new.creator = window.sessionStorage.getItem('currentUserId') ?? '';

    this.checklistService.AddChecklist(this.new)
      .then(
        result => {
          alert(`${result.name} has been added`);
          //this.GoToAll();
          this.router.navigate(['checklistItems'], { queryParams: { checklistId: result.id } });
        }
      )
  }

  Cancel() {
    this.router.navigate(['checklists'])
  }

}
