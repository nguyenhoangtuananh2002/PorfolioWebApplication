import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('JwtToken')
  if (token)
  {
    const cloneReq = req.clone(
      {
        setHeaders: {
          Authorization : `Bearer ${JSON.parse(token)}`
        }
      }
    )
    return next(cloneReq);
  }
  return next(req)
};
