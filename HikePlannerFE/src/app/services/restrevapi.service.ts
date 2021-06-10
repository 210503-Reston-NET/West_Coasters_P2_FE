import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { equipment } from '../models/equipment';

@Injectable({
  providedIn: 'root'
})
export class RestRevApiService {
  baseURL: string = 'https://hikeplannerrest.azurewebsites.net/api/';
  userURL: string = this.baseURL + 'users';
  equipmentURL: string = this.baseURL + 'equipments';
  checklistURL: string = this.baseURL + 'checklist';
  activityURL: string = this.baseURL + 'activity';
  tripURL: string = this.baseURL + 'trips';

  constructor(private http: HttpClient) { }

  GetAllEquipments(): Promise<equipment[]> {
    return this.http.get<equipment[]>(this.equipmentURL).toPromise();
  }
  AddAEquipment(newequipment: equipment): Promise<equipment> {
    return this.http.post<equipment>(this.equipmentURL, newequipment).toPromise();
  }

}
