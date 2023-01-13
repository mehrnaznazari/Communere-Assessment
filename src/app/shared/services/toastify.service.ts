import {Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {ToastTypeEnum} from "../enums/toast-type.enum";

@Injectable({
  providedIn: 'root'
})
export class ToastifyService {

  constructor(private toastrService: ToastrService) {
  }

  success(message: string, title?: string) {
    const toast = this.toastrService.show(message, title ? title : '');
    toast.toastRef.componentInstance.type = ToastTypeEnum.Success;
  }

  error(message: string, title?: string) {
    const toast = this.toastrService.show(message, title ? title : '');
    toast.toastRef.componentInstance.type = ToastTypeEnum.Error;
  }

  warning(message: string, title?: string) {
    const toast = this.toastrService.show(message, title ? title : '');
    toast.toastRef.componentInstance.type = ToastTypeEnum.Warning;
  }

  info(message: string, title?: string) {
    const toast = this.toastrService.show(message, title ? title : '');
    toast.toastRef.componentInstance.type = ToastTypeEnum.Info;
  }
}
