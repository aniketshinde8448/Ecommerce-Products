import { Injectable, NgModule} from '@angular/core';
import { Observable } from 'rxjs';
// import 'rxjs/observable/of';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';



@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const dupReq = req.clone({ headers: req.headers.set('Access-Control-Allow-Origin', 'http://localhost:8001/') });
    return next.handle(dupReq);
  }
  errorHandler(error: HttpErrorResponse) {
      return Observable.throw( error.message || 'server error');
  }
}
@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true }
  ]
})
export class InterceptorModule { }
