import { Injectable } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public constructor(private hotToast: HotToastService) {}

  public success(message: string) {
    this.hotToast.success(message, { position: 'top-center' });
  }

  public error(message: string) {
    this.hotToast.error(message, { position: 'top-center' });
  }

  public loading(message: string = 'Chargement...') {
    return this.hotToast.loading(message, { position: 'top-center' });
  }
}
