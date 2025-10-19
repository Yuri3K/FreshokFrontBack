import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, from, Observable, switchMap, throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

export const authTokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService)
  const router = inject(Router)

  if (!req.url.startsWith(environment.serverUrl)) {
    return next(req)
  }

  return from(authService.getIdToken(false))
    .pipe(
      switchMap(token => {
        console.log("🔸 token:", token)

        const authReq = token
          ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
          : req

        return next(authReq)
          .pipe(
            catchError((err: unknown) => {
              const httpErr = err as HttpErrorResponse
              if (httpErr.status === 401) {
                return from(authService.getIdToken(true))
                  .pipe(
                    switchMap(newToken => {
                      if (newToken) {
                        const retried = req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } })
                        return next(retried)
                      }
                      router.navigate(['/login']);
                      return throwError(() => err);
                    }),
                    catchError(() => {
                      router.navigate(['/login']);
                      return throwError(() => err);
                    })
                  )
              }
              return throwError(() => err);
            })
          )
      }),
    )
}