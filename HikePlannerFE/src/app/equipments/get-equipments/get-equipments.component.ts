import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { equipment } from 'src/app/models/equipment';
import { HPApiService} from 'src/app/services/hpapi.service';

@Component({
  selector: 'app-get-equipments',
  templateUrl: './get-equipments.component.html',
  styleUrls: ['./get-equipments.component.css', '../equipment.css']
})
export class GetEquipmentsComponent implements OnInit {

  equipments: equipment[] = [];

  constructor(private equipmentService: HPApiService, private router: Router) { }

  //LC hook. There are others. (go research!)
  ngOnInit(): void {
    this.equipmentService.GetAllEquipments().then(result => this.equipments = result);
  }

  GoToAdd() {
    this.router.navigate(['addEquipment'])
  }

  GoToEdit(equipmentId: number) {
    this.router.navigate(['editEquipment'], { queryParams: { id: equipmentId } });
  }
  Delete(equipmentId: number, name: string) {
    if (confirm(`Are you sure you want to remove ${name}?`).valueOf()) {
      this.equipmentService.DeleteEquipment(equipmentId).then(
        () => {
          alert(`${name} has been deleted`);
          this.equipmentService.GetAllEquipments().then(
            result => { this.equipments = result; }
          )
        }
      )
    }
  }
}
