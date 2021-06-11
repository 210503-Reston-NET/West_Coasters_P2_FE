import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { equipment } from 'src/app/models/equipment';
import { HPApiService } from 'src/app/services/hpapi.service';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css', '../equipment.css']
})
export class AddEquipmentComponent implements OnInit {
  newEquipment: equipment = {
    id: 0,
    name: '',
    description: ''
  }

  constructor(private equipmentService : HPApiService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.equipmentService.AddAEquipment(this.newEquipment)
      .then(
        result => {
          alert(`${result.name} has been added`);
          this.GoToEquipments();
        }
      )
  }
  GoToEquipments() {
    this.router.navigate(['equipments'])
  }
}
