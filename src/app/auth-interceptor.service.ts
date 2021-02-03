import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class AuthInterCeptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Request on its way!');
        const modifiedRequest = req.clone({headers: req.headers.append('Auth', 'xyz')});
        // handle the modifiedRequest not the oringal request
        return next.handle(modifiedRequest);
    }
}
