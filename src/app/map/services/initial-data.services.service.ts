import {Injectable} from '@angular/core';
import {LocationModel} from "../models/location.model";

@Injectable({
  providedIn: 'root'
})

export class InitialDataService {

  private $Locations: LocationModel[] = [
    {
      coordinates: [
        -86.279118,
        32.361538
      ],
      properties: {
        state: "Alabama",
        name: "Montgomery",
        type: "Business"
      }
    },
    {
      coordinates: [
        -134.41974,
        58.301935
      ],
      properties: {
        state: "Alaska",
        name: "Juneau",
        type: "Business"
      }
    },
    {

      coordinates: [
        -112.073844,
        33.448457
      ],
      properties: {
        state: "Arizona",
        name: "Phoenix",
        type: "Home"
      }
    },
    {
      coordinates: [
        -92.331122,
        34.736009
      ],
      properties: {
        state: "Arkansas",
        name: "Little Rock",
        type: "Home"
      }
    },
    {
      coordinates: [
        -121.468926,
        38.555605
      ],
      properties: {
        state: "California",
        name: "Sacramento",
        type: "work"
      }
    },
    {
      coordinates: [
        -104.984167,
        39.7391667
      ],
      properties: {
        state: "Colorado",
        name: "Denver",
        type: "Business"
      }
    },
  ];

  get locationList() {
    return this.$Locations;
  }

  set locationList(value: LocationModel[]) {
    this.$Locations = value;
  }

}
