import { NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core'
import { Button } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth-service';

@Component({
  selector: 'app-navbar',
  imports: [NgOptimizedImage, Button, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  router = inject(Router)
  authservice = inject(AuthService);

  isDark = signal(false)

  toggledarkmode(){
    this.isDark.update(value => !value) // ici on inverse la valeur du signal isDark
    document.documentElement.classList.toggle('app-dark', this.isDark()) // avec document.documentElement.classList.toggle, on ajoute ou on retire la classe 'app-dark' à l'élément racine du document (html) en fonction de la valeur actuelle de isDark() (qui est soit true soit false). Si isDark() est true, la classe 'app-dark' sera ajoutée, sinon elle sera retirée. Cela permet de basculer entre les thèmes clair et sombre en appliquant les styles correspondants définis dans le CSS pour la classe 'app-dark'.
  }

  logout(){
    this.authservice.logout().subscribe(() => {
     void this.router.navigate(['/']);
    })
  }


}

