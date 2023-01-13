import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MapService {

  constructor() {
  }

  makeCapitalPopup(data: any): string {
    return `` +
      `<div>Capital: ${data.name}</div>` +
      `<div>Capital: ${data.state}</div>` +
      `<div>State: ${data.type}</div>`
  }
}
