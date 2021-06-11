import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { equipment } from 'src/app/models/equipment';
import { HPApiService } from 'src/app/services/hpapi.service';

@Component({
  selector: 'app-edit-equipment',
  templateUrl: './edit-equipment.component.html',
  styleUrls: ['./edit-equipment.component.css']
})

export class EditEquipmentComponent implements OnInit {
  toEdit: equipment = {
    id: 0,
    name: '',
    description: ''
  }
  constructor(private equipmentService : HPApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.equipmentService.GetEquipment(params.id).then(
          found => {
            this.toEdit = found;
          }
        );
      }
    );
  }
  onSubmit(): void {
    this.equipmentService.EditRestaurant(this.toEdit).then
      (
        () => {
          alert('Changes saved!');
          this.router.navigate(['equipments']);
        }
      )
  }
}
