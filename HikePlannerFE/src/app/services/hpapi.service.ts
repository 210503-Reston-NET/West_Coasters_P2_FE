import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { checklist } from '../models/checklist';
import { checklistItem } from '../models/checklistItem';
import { equipment } from '../models/equipment';
import {activity} from '../models/activity';
import { trips } from '../models/trips';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class HPApiService {
  baseURL: string = 'https://hikeplannerapi.azurewebsites.net/api/';
  userURL: string = this.baseURL + 'users';
  equipmentURL: string = this.baseURL + 'equipments';
  activity: string = this.baseURL + 'activity';
  activityURL: string = this.baseURL + 'activity';
  checklistURL: string = this.baseURL + 'checklist';
  tripURL: string = this.baseURL + 'trips';

  constructor(private http: HttpClient) { }

  //Equipment
  GetAllEquipments(): Promise<equipment[]> {
    return this.http.get<equipment[]>(this.equipmentURL).toPromise();
  }
  AddEquipment(newequipment: equipment): Promise<equipment> {
    return this.http.post<equipment>(this.equipmentURL, newequipment).toPromise();
  }
  AddAnActivity(neActivity: activity): Promise<activity>{
    return this.http.post<activity>(this.activityURL, neActivity).toPromise();
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
  GetAllActivities(): Promise<activity[]>{
    return this.http.get<activity[]>(this.activityURL).toPromise();
  }
  DeleteActivity(activityId: number): Promise<void>{
    return this.http.delete<void>(`${this.activityURL}/${activityId}`).toPromise();
  }
  GetActivity(activityId: number): Promise<activity>{
    return this.http.get<activity>(`${this.activityURL}/${activityId}`).toPromise();
  }
  GetTrips(): Promise<trips[]>{
    return this.http.get<trips[]>(this.tripURL).toPromise();
  }
  DeleteTrip(tripId: number) :Promise<void>{
    return this.http.delete<void>(`${this.tripURL}/${tripId}`).toPromise();
  }
  AddTrip(newTrip: trips): Promise<trips> {
    console.log("service clocked!");
    return this.http.post<trips>(this.tripURL, newTrip).toPromise();
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
