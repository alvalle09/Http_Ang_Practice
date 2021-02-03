import { tap } from 'rxjs/operators';
import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class AuthInterCeptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Request on its way!');
        console.log(req.url);
        const modifiedRequest = req.clone({headers: req.headers.append('Auth', 'xyz')});

        // handle the modifiedRequest, not the oringal request
        return next.handle(modifiedRequest).pipe(tap(event => {
            console.log(event);
            if (event.type === HttpEventType.Response) {
                console.log('Response arrived, body data: ');
                console.log(event.body);
            }
        }));
    }
}
