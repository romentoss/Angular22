import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const apiNinjaInterceptor: HttpInterceptorFn = (req, next) => {
  const apiKey = environment.apiNinjasKey;
  if (!apiKey || apiKey === 'environment.apiNinjasKey') {
    console.warn('API Key not configured. Add your key to .env file (API_NINJAS_KEY)');
  }
  const clonedReq = req.clone({
    setHeaders: {
      'X-Api-Key': apiKey,
    },
  });
  return next(clonedReq);
};
