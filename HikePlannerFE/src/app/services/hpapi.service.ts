import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { checklist } from '../models/checklist';
import { checklistItem } from '../models/checklistItem';
import { equipment } from '../models/equipment';
import {activity} from '../models/activity';
import { trips } from '../models/trips';
import { user } from '../models/user';
//for profile - didn't update our model on trips.
import { trip } from '../models/trip';
import { participant } from '../models/participant';

@Injectable({
  providedIn: 'root'
})
export class HPApiService {
  // baseURL: string = 'https://hikeplannerapi.azurewebsites.net/api/';
  baseURL: string = 'https://hikeplannerrest.azurewebsites.net/api/';
  userURL: string = this.baseURL + 'users';
  equipmentURL: string = this.baseURL + 'equipments';
  activity: string = this.baseURL + 'activity';
  activityURL: string = this.baseURL + 'activity';
  checklistURL: string = this.baseURL + 'checklist';
  tripURL: string = this.baseURL + 'trips';
  participantURL : string = this.baseURL + 'participants';

  user : string = "";
  constructor(private http: HttpClient) {
    this.user = window.sessionStorage.getItem('currentUserId') ?? '';
   }

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
  GetAllActivitiesByUserId(userId: string): Promise<activity[]>{
    return this.http.get<activity[]>(`${this.activityURL}/creator/${userId}`).toPromise();
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

  GetTripById(id: number): Promise<trip> {
    return this.http.get<trip>(`${this.tripURL}/${id}`).toPromise();
  }

  //for invitation
  GetSharedTrips(userId : string): Promise<trip[]>{
    return this.http.get<trip[]>(`${this.tripURL}/shared/${userId}`).toPromise();
  }

  GetParticipants(tripId : number): Promise<participant[]> {
    return this.http.get<participant[]>(`${this.participantURL}/trip/${tripId}`).toPromise();
  }

  AddParticipant(addNew: participant): Promise<participant> {
    return this.http.post<participant>(`${this.participantURL}`, addNew).toPromise();
  }

  DeleteParticipant(id: number): Promise<void> {
    return this.http.delete<void>(`${this.participantURL}/${id}`).toPromise();
  }

  UpdateParticipant(participant: participant): Promise<void> {
    return this.http.put<void>(`${this.participantURL}/${participant.id}`, participant).toPromise();
  }

  GetTripsByActivityId(id: number): Promise<trips[]>{
    console.log('calling trips by its id...', id, `${this.tripURL}/Activity/${id}`);
    return this.http.get<trips[]>(`${this.tripURL}/Activity/${id}`).toPromise();
  }

  DeleteTrip(tripId: number) :Promise<void>{
    return this.http.delete<void>(`${this.tripURL}/${tripId}`).toPromise();
  }
  AddTrip(newTrip: trips): Promise<trips> {
    let trip = {
      id: newTrip.id,
      activityId: newTrip.activityId,
      startDate: newTrip.startDate,
      endDate: newTrip.endDate,
      distance: newTrip.distance,
      creator: newTrip.creator
    }
    return this.http.post<trips>(this.tripURL, trip).toPromise();
  }

  AddChecklist(addNew: checklist): Promise<checklist> {
    return this.http.post<checklist>(this.checklistURL, addNew).toPromise();
  }

  GetChecklist(id: number): Promise<checklist> {
    console.log("Checklist service clicked", this.http.get<checklist>(`${this.checklistURL}/${id}`).toPromise(), id);
    return this.http.get<checklist>(`${this.checklistURL}/${id}`).toPromise();
  }

  DeleteChecklist(id: number): Promise<void> {
    return this.http.delete<void>(`${this.checklistURL}/${id}`).toPromise();
  }

  UpdateChecklist(checklist: checklist): Promise<void> {
    return this.http.put<void>(`${this.checklistURL}/${checklist.id}`, checklist).toPromise();
  }

  GetAllChecklist(): Promise<checklist[]> {
    return this.http.get<checklist[]>(this.checklistURL).toPromise();
  }

  GetChecklistByUserId(userId: string): Promise<checklist[]> {
    return this.http.get<checklist[]>(`${this.checklistURL}/user/${userId}`).toPromise();
  }

  AddChecklistItem(addNew: checklistItem): Promise<checklistItem> {
    return this.http.post<checklistItem>(`${this.checklistURL}/${addNew.checklistId}/item`, addNew).toPromise();
  }

  // AddChecklistItems(list: checklistItem[]): Promise<checklistItem> {
  //   return this.http.post<checklistItem>(`${this.checklistURL}/${addNew.checklistId}/item`, addNew).toPromise();
  // }

  DeleteChecklistItem(checklistId: number, id: number): Promise<void> {
    return this.http.delete<void>(`${this.checklistURL}/${checklistId}/item/${id}`).toPromise();
  }

  UpdateChecklistItem(checklistId: number, checklistItem: checklistItem): Promise<void> {
    return this.http.put<void>(`${this.checklistURL}/${checklistId}/item`, checklistItem).toPromise();
  }

  //USER
  FindUserByEmail(email: string): Promise<user> {
    return this.http.get<user>(`${this.userURL}/email/${email}`).toPromise();
  }

  CreateUser(user: user): Promise<user> {
    return this.http.post<user>(`${this.userURL}`, user).toPromise();
  }
  GetTripsByCreator(id: string): Promise<trips[]>{
    return this.http.get<trips[]>(`${this.tripURL}/Creator/${id}`).toPromise();
  }
  GetUserById(userId: string): Promise<user> {
    return this.http.get<user>(`${this.userURL}/${userId}`).toPromise();
  }


}
