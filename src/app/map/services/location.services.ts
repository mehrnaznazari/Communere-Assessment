import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {InitialDataService} from "./initial-data.services.service";
import {LocationModel} from "../models/location.model";

@Injectable({
  providedIn: "root"
})

export class LocationServices {

  private _LOCATION = 'location';

  private locationObject$: BehaviorSubject<LocationModel[]> = new BehaviorSubject<LocationModel[]>([]);
  locationList$: Observable<LocationModel[]> = this.locationObject$.asObservable();

  constructor(private initialDataService: InitialDataService) {
    if (!!this.getLocations()) {
      this.loadLocations()
    } else {
      this.setLocations(this.initialDataService.locationList);
    }
  }

  loadLocations() {
    const data = JSON.parse(this.getLocations())
    this.setLocationList(data);
  }

  getLocations(): string {
    return <string>localStorage.getItem(this._LOCATION);
  }

  setLocations(locationList: LocationModel[]): void {
    localStorage.setItem(this._LOCATION, JSON.stringify(locationList))
    this.setLocationList(locationList);
  }

  clearInfo() {
    localStorage.removeItem(this._LOCATION);
    this.setLocationList([]);
  }

  setLocationList(obj: LocationModel[]): void {
    this.locationObject$.next(obj)
  }

  addLocation(Location: LocationModel) {
    let LocationItems = JSON.parse(this.getLocations() ?? '');
    LocationItems.push(Location);
    this.setLocations(LocationItems);
  }


}
