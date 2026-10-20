import { HttpClient, HttpInterceptorFn } from '@angular/common/http';

export const indexInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};

// const APIURL = inject(API_URL);
// const APIToken = inject(API_TOKEN);
//       headers: { Authorization: `Bearer ${APIToken}` },


// Chain of Responsibility Pattern

// HttpClient.handler = IntA
// IntA.next = IntB
// IntB.next = IntC
// ...
// IntN.next = IntN
// IntN.next = HttpHandler = Req -> Observable


// HttpClient.get() -> Observable<Resp>