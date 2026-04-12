import { inject } from '@angular/core';
import { AuthService } from './auth-service';
import { CanActivateFn, Router } from '@angular/router'

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService)
  const router = inject(Router)




 if (authService.currentUser()) return true
 return router.createUrlTree(['/auth']) // return false , le creaturltree redirige vers la page d'authentification
}
