import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {icon, LatLng, LeafletEvent, Map, MapOptions, Marker} from 'leaflet';
import {MapService} from "../../services/map.service";
import {LocationModel} from "../../models/location.model";
import {Observable, Subscription} from "rxjs";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()

@Component({
  selector: 'app-leaf-map',
  templateUrl: './leaf-map.component.html',
  styleUrls: ['./leaf-map.component.scss']
})

export class LeafMapComponent implements OnInit, AfterViewInit {
  public map: Map;
  public zoom: number;
  @Input() options!: MapOptions;
  @Input() mapLocation$!: Observable<LocationModel[]> | null;
  // @Output() map$: EventEmitter<Map> = new EventEmitter;
  @Output() zoom$: EventEmitter<number> = new EventEmitter;
  @Output() clickedOnMap$: EventEmitter<any> = new EventEmitter;

  markerIconOption = icon({
    iconSize: [25, 41],
    iconAnchor: [13, 41],
    iconUrl: '../assets/images/marker-icon.png',
    iconRetinaUrl: '../assets/images/marker-icon.png',
  });

  private subscription: Subscription;

  constructor(private mapService: MapService) {
    Marker.prototype.options.icon = this.markerIconOption;
  }

  ngOnInit(): void {
    this.makeCapitalMarkers(this.map);
  }

  ngAfterViewInit(): void {
    this.makeCapitalMarkers(this.map);
  }

  makeCapitalMarkers(map: Map): void {
    if (this.mapLocation$) {
      this.mapLocation$
        .pipe(untilDestroyed(this))
        .subscribe(locationsList => {
          for (const item of locationsList) {
            const lon = item.coordinates[0];
            const lat = item.coordinates[1];
            const marker = new Marker([lat, lon]);
            marker.addTo(map);
            marker.bindPopup(this.mapService.makeCapitalPopup(item.properties));
          }
        })
    }
  }

  ngOnDestroy() {
    this.map.clearAllEventListeners();
    this.map.remove();
    this.subscription.unsubscribe();
  };

  onMapReady(map: Map) {
    this.map = map;
    // this.map$.emit(map);
    this.zoom = map.getZoom();
    this.zoom$.emit(this.zoom);
  }

  onMapZoomEnd(e: LeafletEvent) {
    this.zoom = e.target.getZoom();
    console.log(this.zoom)
    this.zoom$.emit(this.zoom);
  }

  onMapClick(e) {
    console.log(e.latlng)
    this.clickedOnMap$.emit({latlng: e.latlng, map: this.map})
  }
}
