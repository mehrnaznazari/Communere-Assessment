import {Component} from '@angular/core';
import {MenuItemInterface} from '../model/menu-item.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent {

  menuItems: MenuItemInterface[] = [
    {
      title: 'Map Page',
      link: 'maps'
    },
    {
      title: 'Add Location',
      link: 'add-location'
    },
  ];


  constructor() {
  }

}
