import { HttpInterceptorFn } from '@angular/common/http'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req.clone({ // withCredentials: true, on indique que les requetes HTTP doivent inclure les cookies d'authentification pour permettre au serveur de reconnaitre l'utilisateur connecté et de maintenir la session active. Cela est nécessaire pour les opérations d'authentification et d'autorisation qui dépendent des cookies pour identifier l'utilisateur.
    withCredentials: true
  }))
}
