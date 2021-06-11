import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  trailURL : string = 'https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_TrailNFSPublish_01/MapServer/0/query?f=pjson&outFields=*&objectIds=';
  trailheadURL: string = 'https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_RecreationOpportunities_01/MapServer/0/query?f=pjson&outFields=*&objectIds=';
  constructor(private http: HttpClient) { }

  GetTrailById(id: number): Promise<any> {
    return this.http.get(`${this.trailURL}${id}`).toPromise();
  }

  GetTrailHeadById(id: number): Promise<any> {
    return this.http.get(`${this.trailheadURL}${id}`).toPromise();
  }
}
