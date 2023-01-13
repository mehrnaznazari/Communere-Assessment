import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LeafMapComponent} from "./components/leaf-map/leaf-map.component";
import {MapRepresentationComponent} from './components/map-representation/map-representation.component';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {MapRoutingModule} from "./map-routing.module";
import {CustomLocationComponent} from './components/custom-location/custom-location.component';
import {UploadFileModule} from "../shared/components/upload-file/upload-file.module";

@NgModule({
  declarations: [
    MapRepresentationComponent,
    LeafMapComponent,
    CustomLocationComponent,
  ],
  imports: [
    CommonModule,
    MapRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LeafletModule,
    UploadFileModule,
  ],
  exports: [],
  providers: []
})
export class MapModule {
}
