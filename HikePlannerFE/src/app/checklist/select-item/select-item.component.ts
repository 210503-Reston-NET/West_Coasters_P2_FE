import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { checklist } from 'src/app/models/checklist';
import { checklistItem } from 'src/app/models/checklistItem';
import { equipment } from 'src/app/models/equipment';
import { HPApiService} from 'src/app/services/hpapi.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-select-item',
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.css', '../checklist.css']
})
export class SelectItemComponent implements OnInit {

  isShow: boolean = false;
  checklistId : number = 0;
  quan : number = 0;
  isReady: boolean = false;

  map = new Map<equipment, number>();

  items : Map<equipment, number>[] = [];

  cur: equipment = {
    id: 0,
    name: '',
    description: ''
  }

  target: checklist = {
    id: 0,
    name: '',
    dateCreated: null,
    creator: '',
    checklistItems: []
  }

  constructor(private hpService: HPApiService, private route: ActivatedRoute, private router: Router, public user: UserService, public auth: AuthService) {   }

  ngOnInit(): void {
    this.hpService.GetAllEquipments().then(result =>
      result.forEach(e => this.map.set(e, 0))
    );
    this.route.queryParams.subscribe(
      params => {
        this.checklistId = params.id
      }
    )
    this.hpService.GetChecklist(this.checklistId).then(
      result => {
        this.target = result;
      }
    )
  }

  GoToAdd() {
    this.router.navigate(['addEquipment'])
  }

  OpenAddQauntity(e : equipment) {
    this.route.queryParams.subscribe(
      params => {
        this.cur = e;
      }
    )
    this.isShow = !this.isShow;
    this.isReady = true;
  }

  onSubmit(): void {
    this.map.set(this.cur, this.quan);
    this.quan = 0;
    this.isShow = false;
    console.log(this.map);
  }

  SubmitChecklist(): void {
    for(let entry of this.map.entries()) {
      if (entry[1] > 0) {
        let newItem : checklistItem = {
          id: 0,
          quantity: entry[1],
          checklistId: this.checklistId,
          equipmentId: entry[0].id,
          equipment: null,
        }
        this.target.checklistItems?.push(newItem);
        this.hpService.AddChecklistItem(newItem);
      }
    }
    //update here
    //this.hpService.UpdateChecklist(this.target);

    console.log(this.target);
  }

}
