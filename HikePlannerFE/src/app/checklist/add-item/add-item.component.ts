import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { checklistItem } from 'src/app/models/checklistItem';
import { HPApiService } from 'src/app/services/hpapi.service';
import { equipment } from 'src/app/models/equipment';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css',  '../checklist.css']
})
export class AddItemComponent implements OnInit {
  new: checklistItem = {
    id: 0,
    quantity: 0,
    checklistId: 1,
    equipmentId: 6,
    equipment: null,
  }

  constructor(private itemService : HPApiService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.itemService.AddChecklistItem(this.new)
      .then(
        result => {
          alert(`${result.quantity} has been added`);
          //this.GoToAll();
        }
      )
  }
  // GoToAll() {
  //   this.router.navigate(['items'])
  // }
  //<i class="fa fa-arrow-circle-left" aria-hidden="true" (click)='GoToAll()'></i>

}
