import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MapRepresentationComponent} from "./components/map-representation/map-representation.component";
import {CustomLocationComponent} from "./components/custom-location/custom-location.component";

const routes: Routes = [
  {path: '', redirectTo: 'maps', pathMatch: 'full'},
  {
    path: 'maps',
    component: MapRepresentationComponent,
  },
  {
    path: 'edit/:id',
    component: MapRepresentationComponent,
  },
  {
    path: 'add-location',
    pathMatch: 'full',
    component: CustomLocationComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class MapRoutingModule {
}
