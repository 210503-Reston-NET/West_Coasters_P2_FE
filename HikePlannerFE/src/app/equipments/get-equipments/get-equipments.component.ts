import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { equipment } from 'src/app/models/equipment';
import { HPApiService} from 'src/app/services/hpapi.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-get-equipments',
  templateUrl: './get-equipments.component.html',
  styleUrls: ['./get-equipments.component.css']
})
export class GetEquipmentsComponent implements OnInit {

  equipments: equipment[] = [];

  constructor(private equipmentService: HPApiService, private router: Router, public user: UserService, public auth: AuthService) { }

  //LC hook. There are others. (go research!)
  ngOnInit(): void {
    this.equipmentService.GetAllEquipments().then(result => this.equipments = result);
    console.log('equipment',  window.sessionStorage.getItem('currentUserId'));
  }

  GoToAddEquipment() {
    this.router.navigate(['addEquipment'])
  }

  GoToEditEquipment(equipmentId: number) {
    this.router.navigate(['editEquipment'], { queryParams: { id: equipmentId } });
  }

}
