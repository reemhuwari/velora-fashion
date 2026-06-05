import {
  Injectable,
  signal
} from '@angular/core';

import { Toast }
from '../models/toast.model';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root'
})
export class ToastService {
private translate =
  inject(TranslateService);
  toasts =
    signal<Toast[]>([]);

 show(
  message: string,
  type:
    'success' |
    'error' |
    'info' = 'info'
): void {

  const toast: Toast = {

    id: Date.now(),

    message:
      this.translate.instant(
        message
      ),

    type

  };

  this.toasts.update(
    current => [
      ...current,
      toast
    ]
  );

  setTimeout(() => {
    this.remove(toast.id);
  }, 3000);

}

  remove(id: number): void {

    this.toasts.update(

      current =>

        current.filter(

          toast =>
            toast.id !== id

        )

    );

  }

}