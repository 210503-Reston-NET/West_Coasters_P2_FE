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

  GoToAddEquipment() {
    this.router.navigate(['addEquipment'])
  }

  GoToEditEquipment(equipmentId: number) {
    this.router.navigate(['editEquipment'], { queryParams: { id: equipmentId } });
  }

}
