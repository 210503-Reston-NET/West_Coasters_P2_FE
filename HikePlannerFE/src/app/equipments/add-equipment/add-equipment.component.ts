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
  new: equipment = {
    id: 0,
    name: '',
    description: ''
  }

  constructor(private equipmentService : HPApiService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.equipmentService.AddAEquipment(this.new)
      .then(
        result => {
          alert(`${result.name} has been added`);
          this.GoToAll();
        }
      )
  }
  GoToAll() {
    this.router.navigate(['equipments'])
  }
}
