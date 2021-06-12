import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { checklist } from '../models/checklist';
import { checklistItem } from '../models/checklistItem';
import { equipment } from '../models/equipment';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class HPApiService {
  // baseURL: string = 'https://localhost:44303/api/';
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
  AddEquipment(newequipment: equipment): Promise<equipment> {
    return this.http.post<equipment>(this.equipmentURL, newequipment).toPromise();
  }

  GetEquipment(equipmentId: number): Promise<equipment> {
    return this.http.get<equipment>(`${this.equipmentURL}/${equipmentId}`).toPromise();
  }

  EditEquipment(equipment: equipment): Promise<void> {
    return this.http.put<void>(`${this.equipmentURL}/${equipment.id}`, equipment).toPromise();
  }
  DeleteEquipment(equipmentId: number): Promise<void> {
    return this.http.delete<void>(`${this.equipmentURL}/${equipmentId}`).toPromise();
  }

  AddChecklist(addNew: checklist): Promise<checklist> {
    return this.http.post<checklist>(this.checklistURL, addNew).toPromise();
  }

  GetChecklist(id: number): Promise<checklist> {
    return this.http.get<checklist>(`${this.checklistURL}/${id}`).toPromise();
  }

  GetAllChecklist(): Promise<checklist[]> {
    return this.http.get<checklist[]>(this.checklistURL).toPromise();
  }

  AddChecklistItem(addNew: checklistItem): Promise<checklistItem> {
    return this.http.post<checklistItem>(`${this.checklistURL}/${addNew.checklistId}/item`, addNew).toPromise();
  }

  //USER
  FindUserByEmail(email: string): Promise<user> {
    return this.http.get<user>(`${this.userURL}/email/${email}`).toPromise();
  }

  CreateUser(user: user): Promise<user> {
    return this.http.post<user>(`${this.userURL}`, user).toPromise();
  }
}
