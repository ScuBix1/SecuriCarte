import { Injectable } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private hotToast: HotToastService) {}

  success(message: string) {
    this.hotToast.success(message);
  }

  error(message: string) {
    this.hotToast.error(message);
  }
}
