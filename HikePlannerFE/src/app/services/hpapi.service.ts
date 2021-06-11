import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { equipment } from '../models/equipment';

@Injectable({
  providedIn: 'root'
})
export class HPApiService {
  baseURL: string = 'https://hikeplannerrest.azurewebsites.net/api/';
  userURL: string = this.baseURL + 'users';
  equipmentURL: string = this.baseURL + 'equipments';
  checklistURL: string = this.baseURL + 'checklist';
  activityURL: string = this.baseURL + 'activity';
  tripURL: string = this.baseURL + 'trips';

  constructor(private http: HttpClient) { }

  //Equipment
  GetAllEquipments(): Promise<equipment[]> {
    return this.http.get<equipment[]>(this.equipmentURL).toPromise();
  }
  AddAEquipment(newequipment: equipment): Promise<equipment> {
    return this.http.post<equipment>(this.equipmentURL, newequipment).toPromise();
  }

  GetEquipment(equipmentId: number): Promise<equipment> {
    return this.http.get<equipment>(`${this.equipmentURL}/${equipmentId}`).toPromise();
  }

  EditRestaurant(equipment: equipment): Promise<void> {
    return this.http.put<void>(`${this.equipmentURL}/${equipment.id}`, equipment).toPromise();
  }
  DeleteRestaurant(equipmentId: number): Promise<void> {
    return this.http.delete<void>(`${this.equipmentURL}/${equipmentId}`).toPromise();
  }


}
