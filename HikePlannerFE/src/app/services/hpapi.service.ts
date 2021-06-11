import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { equipment } from '../models/equipment';
import {activity} from '../models/activity';
import { trips } from '../models/trips';

@Injectable({
  providedIn: 'root'
})
export class HPApiService {
  baseURL: string = 'https://hikeplannerrest.azurewebsites.net/api/';
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
  AddAEquipment(newequipment: equipment): Promise<equipment> {
    return this.http.post<equipment>(this.equipmentURL, newequipment).toPromise();
  }
  AddAnActivity(neActivity: activity): Promise<activity>{
    return this.http.post<activity>(this.activityURL, neActivity).toPromise();
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
}
