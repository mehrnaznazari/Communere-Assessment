import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppComponent} from './app.component';
import {ToastrModule} from "ngx-toastr";
import {WsToastrComponent} from "./shared/components/ws-toastr/ws-toastr.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "./layout/header/header.component";
import {MenuComponent} from "./layout/header/menu/menu.component";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    WsToastrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    LeafletModule,
    ToastrModule.forRoot({
      toastComponent: WsToastrComponent,
      progressBar: true,
      positionClass: 'toast-top-right',
    }),
  ],
    exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
