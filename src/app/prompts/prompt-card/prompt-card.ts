import { AuthService } from './../../auth/auth-service';
import { Component, input, inject, computed } from '@angular/core'
import { Prompt } from '../prompt-model'
import { Button } from 'primeng/button';
import { Textarea } from 'primeng/textarea';
import { Tag } from 'primeng/tag';
import { Card } from 'primeng/card';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-prompt-card',
  imports: [Button, Textarea, Tag, Card, RouterLink],
  templateUrl: './prompt-card.html',
  styleUrl: './prompt-card.scss',
})
export class PromptCard {
  AuthService = inject(AuthService);
  prompt = input.required<Prompt>()

canEdit = computed(() => {
  const currentUser = this.AuthService.currentUser();
  return currentUser && this.prompt().author.id === currentUser.id; // on vérifie si l'utilisateur actuel est le même que l'auteur du prompt en comparant leurs identifiants. Si c'est le cas, la fonction retourne true, ce qui signifie que l'utilisateur a le droit d'éditer le prompt. Sinon, elle retourne false, indiquant que l'utilisateur n'a pas les permissions nécessaires pour éditer ce prompt.

})



  copyToClipBord() {
    void navigator.clipboard.writeText(this.prompt().content) // ici on utilise la méthode writeText de l'API Clipboard pour copier le contenu du prompt dans le presse-papiers de l'utilisateur. La méthode writeText retourne une promesse, et en utilisant void, nous indiquons que nous ne sommes pas intéressés par la valeur de retour de cette promesse.
  }
}
