import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { equipment } from 'src/app/models/equipment';
import { HPApiService } from 'src/app/services/hpapi.service';

@Component({
  selector: 'app-edit-equipment',
  templateUrl: './edit-equipment.component.html',
  styleUrls: ['./edit-equipment.component.css']
})

export class EditEquipmentComponent implements OnInit {
  toEditEquipment: equipment = {
    id: 0,
    name: '',
    description: ''
  }
  constructor(private equipmentService : HPApiService, private router: Router) { }

  ngOnInit(): void {
  }

}
