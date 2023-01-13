import {Component, HostBinding, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {ToastTypeEnum} from "../../enums/toast-type.enum";
import {Toast, ToastPackage, ToastrService} from "ngx-toastr";

@Component({
  selector: '[app-ws-toastr]',
  templateUrl: './ws-toastr.component.html',
  styleUrls: ['./ws-toastr.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  animations: [
    trigger('flyInOut', [
      state('inactive', style({
        opacity: 0,
      })),
      transition('inactive => active', animate('400ms ease-out', keyframes([
        style({
          transform: 'translate3d(100%, 0, 0) skewX(-30deg)',
          opacity: 0,
        }),
        style({
          transform: 'skewX(20deg)',
          opacity: 1,
        }),
        style({
          transform: 'skewX(-5deg)',
          opacity: 1,
        }),
        style({
          transform: 'none',
          opacity: 1,
        }),
      ]))),
      transition('active => removed', animate('400ms ease-out', keyframes([
        style({
          opacity: 1,
        }),
        style({
          transform: 'translate3d(100%, 0, 0) skewX(30deg)',
          opacity: 0,
        }),
      ]))),
    ]),
  ],
  preserveWhitespaces: false,
})

export class WsToastrComponent extends Toast implements OnInit {
  @Input() type!: ToastTypeEnum;
  toastTypeEnum = ToastTypeEnum;
  @HostBinding('class') public hostClass: string = '';

  constructor(
    protected override toastrService: ToastrService,
    public override toastPackage: ToastPackage,
  ) {
    super(toastrService, toastPackage);
  }

  action(event: Event) {
    event.stopPropagation();
    this.toastPackage.triggerAction();
    return false;
  }

  ngOnInit(): void {
    this.setBackgroundColor();
  }

  setBackgroundColor() {
    switch (this.type) {
      case ToastTypeEnum.Error:
        this.hostClass = 'toast-container-error';
        break;
      case ToastTypeEnum.Info:
        this.hostClass = 'toast-container-info';
        break;
      case ToastTypeEnum.Success:
        this.hostClass = 'toast-container-success';
        break;
      case ToastTypeEnum.Warning:
        this.hostClass = 'toast-container-warning';
        break;
      default:
        this.hostClass = '';
    }
  }

}
