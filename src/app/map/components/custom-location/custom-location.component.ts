import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {latLng, Map, MapOptions, Marker, tileLayer} from "leaflet";
import {LocationServices} from "../../services/location.services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-custom-location',
  templateUrl: './custom-location.component.html',
  styleUrls: ['./custom-location.component.scss']
})

export class CustomLocationComponent implements OnInit {
  pageTitle = 'Share Location';
  modifyLocationForm!: FormGroup;
  file!: File | undefined;

  locationTypeItems = [
    {id: 1, name: "Home"},
    {id: 2, name: "Business"},
    {id: 3, name: "Work"},
  ];
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
    center: latLng(39.370751716393386, -100.37091527947504),
  };
  private map: Map;
  private zoom: number;
  private marker: Marker;

  constructor(private formBuilder: FormBuilder,
              private locationServices: LocationServices,
              private router: Router) {
  }

  ngOnInit(): void {
    this.modifyLocationForm = this.formBuilder.group({
      locationName: ['', Validators.required],
      coordinates: [null, Validators.required],
      locationType: [null, Validators.required],
      logo: [''],
    })
  }

  modifyLocationHandler(): void {
    console.log(this.modifyLocationForm.value)
    const payload = {
      coordinates: this.modifyLocationForm.value.coordinates,
      properties: {
        state: `${this.modifyLocationForm.value.coordinates}`,
        name: this.modifyLocationForm.value.locationName,
        type: this.locationTypeItems.find(this.modifyLocationForm.value.locationType).name,
      }
    }
    console.log(payload)
    this.locationServices.addLocation(payload)
    this.router.navigate(['maps']).then()
  }

  uploadFile(file: File) {
    this.file = file;
    console.log(this.file)
  }

  selectedLocationHandler($event) {
    console.log($event)
    this.map && this.map.removeLayer(this.marker)
    this.map = $event.map;
    this.marker = new Marker([$event.latlng.lat, $event.latlng.lng])
    this.marker.addTo(this.map)
    this.modifyLocationForm.get('coordinates').patchValue([$event.latlng.lat, $event.latlng.lng])
  }

}
