import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { equipment } from 'src/app/models/equipment';
import { HPApiService} from 'src/app/services/hpapi.service';

@Component({
  selector: 'app-get-equipments',
  templateUrl: './get-equipments.component.html',
  styleUrls: ['./get-equipments.component.css', '../equipment.css']
})
export class GetEquipmentsComponent implements OnInit {

  equipments: equipment[] = [];
  allEquipments: equipment[] = [];
  private _filterByLetters!: string;

  public get filterByLetters(): string {
    return this._filterByLetters;
  }

  public set filterByLetters(v: string) {
    this._filterByLetters = v;
    this.equipments = v ? this.allEquipments.filter((equipment) => equipment.name.toLocaleLowerCase().indexOf(v) !== -1) : this.allEquipments;
  }
  constructor(private equipmentService: HPApiService, private router: Router, public auth: AuthService) { }

  //LC hook. There are others. (go research!)
  ngOnInit(): void {
    this.equipmentService.GetAllEquipments().then(result => {this.equipments = result; this.allEquipments = result});

    console.log('equipment',  window.sessionStorage.getItem('currentUserId'));
    console.log(window.sessionStorage);

  }

  GoToAdd() {
    this.router.navigate(['addEquipment'])
  }

  OpenAddQauntity(){
    //open enter quantity
    this.router.navigate([''])
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
