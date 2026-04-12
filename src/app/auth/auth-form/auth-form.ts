import { AuthService } from './../auth-service';
import { Component, signal,inject } from '@angular/core'
import { FormControl, ReactiveFormsModule,FormGroup , Validators} from '@angular/forms';
import { Card } from "primeng/card";
import { Button } from 'primeng/button';
import { InputText } from "primeng/inputtext";
import { Password } from 'primeng/password';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth-form',
  imports: [ReactiveFormsModule, Card, Button, InputText, Password],
  templateUrl: './auth-form.html',
  styleUrl: './auth-form.scss',
})
export class AuthForm {

  AuthService = inject(AuthService);
  router = inject(Router);


  mode = signal<'login' | 'register'>('login');

  form = new FormGroup({
    username : new FormControl('',{
      nonNullable: true,
      validators: [Validators.required]
    }),
    password : new FormControl('',{
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4)]
    }),
  });

    toggleMode() {
      this.mode.update(value => value === 'login' ? 'register' : 'login');
     }



     submit(){
      this.form.markAllAsTouched(); // on marque tous les champs du formulaire comme touchés pour afficher les messages d'erreur si nécessaire
      if(this.form.invalid) return; // si le formulaire est invalide, on arrête l'exécution de la fonction

      const {username, password} = this.form.getRawValue(); // on recupere les valeurs du formulaire et on les stocke dans des variables username et password
      if(this.mode() === 'login'){
       this.login(username, password)
      } else {
        this.register(username, password)
      }
     }

     login(username: string, password: string){
        this.AuthService.login(username, password).subscribe(() => {
              void this.router.navigate(['/']); // on navigue vers la page d'accueil après une connexion réussie
        });
     }

     register(username: string, password: string){
     this.AuthService.register(username, password).subscribe(() => {
              void this.router.navigate(['/']); // on navigue vers la page d'accueil après une inscription réussie
        });
     }











}
