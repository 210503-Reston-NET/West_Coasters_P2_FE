import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { checklistItem } from 'src/app/models/checklistItem';
import { HPApiService } from 'src/app/services/hpapi.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css',  '../checklist.css']
})
export class AddItemComponent implements OnInit {
  new: checklistItem = {
    id: 0,
    quantity: 0,
    checklistId: 0,
    equipmentId: 0,
    equipment: null,
  }

  constructor(private itemService : HPApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.new.checklistId = params.id;
      }
    )
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
