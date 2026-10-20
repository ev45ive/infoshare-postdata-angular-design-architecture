import { HttpClient, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { API_TOKEN, API_URL } from '@core/tokens';
import { catchError, delay, EMPTY, retry, timeout, timer } from 'rxjs';

export const HTTP_ERRORS = {
  // Authentication and authorization failures.
  auth: [401, 403],
  // Transient failures that may be retried.
  retry: [408, 425, 429, 500, 502, 503, 504],
};

export const URLInterceptor =
  (config?: {}): HttpInterceptorFn =>
  (req, next) => {
    const APIURL = inject(API_URL);

    // Excape Hatch
    if (req.url.match(/^https?:/)) return next(req);

    return next(
      req.clone({
        url: APIURL + req.url,
      }),
    );
  };

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const APIToken = inject(API_TOKEN);
  const router = inject(Router);

  if (req.headers.has('Authorization')) return next(req);


  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${APIToken}`,
      },
    }),

  ).pipe(
    catchError((error: unknown) => {
      assertHttpError(error); // Correct type or throw

      error satisfies HttpErrorResponse; // HttpErrorResponse

      if (!HTTP_ERRORS.auth.includes(error.status)) throw error;

      router.navigateByUrl('/login');
      return EMPTY;
    }),
  );
};

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    timeout(10_000),
    retry({
      count: 3,
      delay(error, retryCount) {
        assertHttpError(error); // Correct type or throw

        if (!HTTP_ERRORS.retry.includes(error.status)) throw error;

        return timer(500 * retryCount ** 2); // Exponential Backoff
      },
    }),
    catchError((error: unknown) => {
      assertHttpError(error); // Correct type or throw

      // TODO: zod Schema parse
      throw new Error((error.error as ErrorReponse).error.message);
    }),
  );
};

// ZodJS
// Zod.parse(Schema<T>, unkonown) -> T | thorw

export type ErrorReponse = {
  error: {
    status: number;
    message: string;
    code: string; // 'UNAUTHORIZED'|...;
  };
};

// Type Guard - Narrow type or throw
function assertHttpError(error: unknown): asserts error is HttpErrorResponse {
  if (!(error instanceof HttpErrorResponse)) throw error;
}

// Chain of Responsibility Pattern

// HttpClient.handler = IntA
// IntA.next = IntB
// IntB.next = IntC
// ...
// IntN.next = IntN
// IntN.next = HttpHandler = Req -> Observable

// HttpClient.get() -> Observable<Resp>
