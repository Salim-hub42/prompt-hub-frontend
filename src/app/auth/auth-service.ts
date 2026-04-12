import { CurrentUser } from './current-user';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core'
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

HttpClient = inject(HttpClient); // on inject le service HttpClient pour pouvoir faire des requetes HTTP dans notre service d'authentification
baseUrl = environment.apiUrl + 'auth';

currentUser = signal<CurrentUser | undefined>(undefined); // on crée un signal pour stocker les informations de l'utilisateur connecté, initialisé à undefined


loadCurrentUser() {
    return this.HttpClient
    .get<CurrentUser>(this.baseUrl + '/me')
    .pipe(tap(user => this.currentUser.set(user)),
    catchError(() => {
        this.currentUser.set(undefined);
        return of(undefined);
      }))
     }




login(username: string, password: string) {
  return this.HttpClient
    .post<CurrentUser>(this.baseUrl + '/login', {username, password})
    .pipe(tap((currentUser) => this.currentUser.set(currentUser))
  )
  }


  register(username: string, password: string) {
  return this.HttpClient.post<CurrentUser>(this.baseUrl + '/register', {username, password}).pipe(
    tap((currentUser) => this.currentUser.set(currentUser))
  )
  }


  logout() {
  return this.HttpClient
    .post(this.baseUrl + '/logout', {})
    .pipe(tap(() => this.currentUser.set(undefined))
  )
  }










}
