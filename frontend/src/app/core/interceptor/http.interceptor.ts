import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from '../../services/toast.service';

interface ApiError {
  message?: string | { message: string };
}

export const httpToastInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const apiMessage = (error.error as ApiError)?.message;

      if ([401, 403].includes(error.status)) {
        return throwError(() => toast.error(error.error.message));
      }

      if (typeof apiMessage === 'object' && apiMessage?.message) {
        toast.error(apiMessage.message);
      } else if (typeof apiMessage === 'string') {
        toast.error(apiMessage);
      } else {
        toast.error('Une erreur est survenue');
      }

      return throwError(() => error);
    })
  );
};
