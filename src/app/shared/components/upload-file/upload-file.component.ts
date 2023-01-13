import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UploadFileConfigModel} from "../../models/upload-file-config.model";
import {ToastifyService} from "../../services/toastify.service";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadFileComponent implements OnInit {
  fileToUpload!: File;
  accept = '';
  selectedFile: boolean;
  allowedExtensions: any = '';
  @Input() config: UploadFileConfigModel;
  @Output() fileReadyToUpload: EventEmitter<File> = new EventEmitter<File>();

  constructor(private toastifyService: ToastifyService) {
    this.selectedFile = false;
  }

  ngOnInit(): void {
    this.config.allowedExtensions.forEach(el => {
      this.accept = `${this.accept},.${el}`;
      this.allowedExtensions = this.allowedExtensions + ' ' + el;
    });

    this.accept = this.accept.length > 0 ? this.accept.substring(1) : '';
  }

  uploadFile(files: any): void {
    if (files.length === 0) {
      return;
    }

    if (files.length === 1) {
      this.fileToUpload = files[0] as File;
      const ext = this.extension(this.fileToUpload.name).toLowerCase();

      if (!this.config?.allowedExtensions.includes(ext)) {
        this.toastifyService.warning('Submitted file format is not allowed.');
        this.selectedFile = false;
        return;
      }

      if (this.fileToUpload.size > this.config?.maxFileSize) {
        this.toastifyService.warning('The size of the selected file is more than the allowed limit.');
        this.selectedFile = false;
        return;
      } else {
        this.fileReadyToUpload.emit(files);
        this.selectedFile = true;
      }
    }

  }

  extension(name: string): string {
    const indexOfLastDot = name.lastIndexOf('.') + 1;
    return name.substring(indexOfLastDot);
  }
}
