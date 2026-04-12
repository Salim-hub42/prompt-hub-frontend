import { ApplicationConfig, provideAppInitializer, provideBrowserGlobalErrorListeners, inject } from '@angular/core'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { provideRouter, withComponentInputBinding } from '@angular/router'
import { authInterceptor } from './auth/auth-interceptor'
import { AuthService } from './auth/auth-service'

import { routes } from './app.routes'
import { providePrimeNG } from 'primeng/config'
import Aura from '@primeuix/themes/aura'
import { definePreset } from '@primeuix/themes'


const promptPreset = definePreset(Aura, { // ici  on crée un preset personnalisé basé sur le thème Aura de PrimeUI, en modifiant les couleurs primaires de primeng.
  semantic: {
    primary: {
        50:'{indigo.50}',
        100:'{indigo.100}',
        200:'{indigo.200}',
        300:'{indigo.300}',
        400:'{indigo.400}',
        500:'{indigo.500}',
        600:'{indigo.600}',
        700:'{indigo.700}',
        800:'{indigo.800}',
        900:'{indigo.900}',
        950:'{indigo.950}'
    }
  }
})

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => inject(AuthService).loadCurrentUser()),// ici on utilise provideAppInitializer pour charger les informations de l'utilisateur connecté dès le démarrage de l'application, en appelant la méthode loadCurrentUser() du service d'authentification et en convertissant le résultat en Promise pour que Angular attende la fin de cette opération avant de continuer à initialiser l'application.
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes,withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor])), // ici on ajoute notre interceptor d'authentification à la configuration du client HTTP pour que toutes les requetes HTTP incluent les cookies d'authentification.
    providePrimeNG({ // ici on configure PrimeNG pour utiliser notre preset personnalisé et activer le mode sombre en fonction de la classe CSS .app-dark sur le body ou un conteneur parent.
      theme: {
        preset: promptPreset,
        options:{ // ici on définit les options de thème, notamment le sélecteur CSS pour activer le mode sombre.
          darkModeSelector: '.app-dark',
        }
      }
    })
  ],
}
