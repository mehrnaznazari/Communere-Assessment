import {Component, OnInit} from '@angular/core';
import {latLng, Map, MapOptions, tileLayer} from "leaflet";
import {LocationServices} from "../../services/location.services";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-map-representation',
  templateUrl: './map-representation.component.html',
  styleUrls: ['./map-representation.component.scss']
})
export class MapRepresentationComponent implements OnInit {
  private map: Map;
  private zoom: number;

  mapOptions: MapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        opacity: 0.7,
        maxZoom: 21,
        detectRetina: true,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }),
    ],
    zoom: 5,
    // zoom: 13,
    // center: latLng(35.7219, 51.3347),
    center: latLng(39.370751716393386, -100.37091527947504),
  };

  constructor(public locationServices: LocationServices) {
  }

  ngOnInit(): void {
  }

  /*  receiveMap(map: Map) {
      this.map = map;
      console.log(map)
      console.log(this.map)
    }*/

  receiveZoom(zoom: number) {
    this.zoom = zoom;
  }


}
