import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { equipment } from '../models/equipment';

@Injectable({
  providedIn: 'root'
})
export class RestRevApiService {
  baseURL: string = 'https://hikeplannerrest.azurewebsites.net/api/equipments';

  constructor(private http: HttpClient) { }

  GetAllEquipments(): Promise<equipment[]> {
    return this.http.get<equipment[]>(this.baseURL).toPromise();
  }
  AddAEquipment(newequipment: equipment): Promise<equipment> {
    return this.http.post<equipment>(this.baseURL, newequipment).toPromise();
  }

}
