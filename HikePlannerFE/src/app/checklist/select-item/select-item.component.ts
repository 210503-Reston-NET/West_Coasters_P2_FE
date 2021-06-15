import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { checklist } from 'src/app/models/checklist';
import { checklistItem } from 'src/app/models/checklistItem';
import { HPApiService} from 'src/app/services/hpapi.service';

@Component({
  selector: 'app-select-item',
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.css', '../checklist.css']
})
export class SelectItemComponent implements OnInit {

  checklistId : number = 0;
  isReady: boolean = false;

  target: checklist = {
    id: 0,
    name: '',
    dateCreated: null,
    creator: '',
    checklistItems: []
  };

  allEquipmentsWithQuantity: checklistItem[] = [];

  constructor(private hpService: HPApiService, private route: ActivatedRoute, private router: Router, public auth: AuthService) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(
      params => {
        this.checklistId = Number(params.id);
        this.hpService.GetChecklist(this.checklistId).then(
          result => {
            this.target = result;
        });
        this.hpService.GetAllEquipments().then(result =>
          {
            result.forEach(equip => {
              let listItem: checklistItem = {
                id: 0,
                quantity: 0,
                checklistId: this.checklistId,
                equipmentId: equip.id,
                equipment: equip
              };
              this.allEquipmentsWithQuantity.push(listItem);
            });
          });
      }
    )
    
  }

  GoToAdd() {
    this.router.navigate(['addEquipment']);
  }

  async SubmitChecklist(): Promise<void> {
    let toAdd: checklistItem[] = this.allEquipmentsWithQuantity.filter(item => item.quantity > 0)
    toAdd.forEach(item => item.equipment = null);
    console.log('preparing to submit...', this.allEquipmentsWithQuantity, toAdd);
    for (let index = 0; index < toAdd.length; index++) {
      await this.hpService.AddChecklistItem(toAdd[index]).then(r => console.log('success!', r));
    }
    this.router.navigate(['checklists']);
  }

  //a cancel btn
  Cancel() {
    this.router.navigate(['checklists']);
  }

}
