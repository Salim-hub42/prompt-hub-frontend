import { CategoryService } from './../category-service';
import { Component,effect,inject,input } from '@angular/core'
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { Textarea } from 'primeng/textarea';
import {InputText} from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { PromptService } from '../prompt-service';
import { Router, RouterLink } from '@angular/router';





@Component({
  selector: 'app-prompt-form',
  imports: [Card, Textarea, InputText, Select, ReactiveFormsModule, Button, RouterLink],
  templateUrl: './prompt-form.html',
  styleUrl: './prompt-form.scss',
})
export class PromptForm {
router = inject(Router)
promptService = inject(PromptService)
categoryService = inject(CategoryService)

promptId = input<number>()

categories = toSignal(this.categoryService.getCategories())

form = new FormGroup({
  title: new FormControl('', {validators:[Validators.required,Validators.maxLength(30)], nonNullable: true }), // le champ title est initialisé à une chaîne vide et doit être rempli par l'utilisateur
  content: new FormControl('',{validators:[Validators.required], nonNullable: true }),
  categoryId: new FormControl(-1,{validators:[Validators.required, Validators.min(0)], nonNullable: true }) // le champ categoryId est initialisé à -1 pour indiquer qu'aucune catégorie n'est sélectionnée par défaut. Les validateurs s'assurent que l'utilisateur doit sélectionner une catégorie valide (c'est-à-dire une valeur supérieure ou égale à 0) avant de pouvoir soumettre le formulaire.
})

constructor(){
  effect(() => { // l'effet est utilisé pour réagir aux changements de la valeur de promptId. Lorsque promptId change, l'effet est réexécuté, ce qui permet de charger les données du prompt à éditer lorsque l'utilisateur navigue vers le formulaire d'édition.
  const promptId = this.promptId()
  if(promptId){
    this.promptService.getPrompt(promptId).subscribe(prompt => {
      this.form.patchValue({
        title: prompt.title,
        content: prompt.content,
        categoryId: prompt.category.id
      })
    })
  }
})
}



submit(){
  this.form.markAllAsTouched() // markAllAsTouched() est utilisé pour marquer tous les champs du formulaire comme "touchés". Cela déclenche l'affichage des messages d'erreur de validation pour les champs qui ne sont pas valides, même si l'utilisateur n'a pas encore interagi avec eux. C'est une bonne pratique pour s'assurer que les utilisateurs voient immédiatement les erreurs de validation lorsqu'ils tentent de soumettre un formulaire incomplet ou incorrect.
  if(this.form.invalid) return

  const promptData = this.form.getRawValue() // getRawValue() est utilisé pour obtenir les valeurs actuelles du formulaire, même si certains champs sont désactivés. Cela garantit que nous obtenons toutes les données nécessaires pour créer un prompt, y compris le categoryId qui peut être initialisé à -1.;
      const promptId = this.promptId()
  if (promptId){
   this.promptService.updatePrompt(promptId, promptData).subscribe(() => {
       void this.router.navigate(['/']) // après la création du prompt, on redirige l'utilisateur vers la liste des prompts.
      })
      }else{
           this.promptService.createPrompt(promptData).subscribe(() => {
       void this.router.navigate(['/']) // après la création du prompt, on redirige l'utilisateur vers la liste des prompts.
      })
      }
    }


    deletePrompt(){
      this.promptService.deletePrompt(this.promptId()!).subscribe(() => {
        void this.router.navigate(['/']) // après la suppression du prompt, on redirige l'utilisateur vers la liste des prompts.
      })
    }



}
