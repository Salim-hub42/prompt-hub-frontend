import { Injectable,inject } from '@angular/core'
import { Prompt } from './prompt-model'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class PromptService {

  httpClient = inject(HttpClient)
  baseUrl = environment.apiUrl + 'prompts'

getPrompts() {
  return this.httpClient.get<Prompt[]>(this.baseUrl)
}

getPrompt(promptId: number) {
  return this.httpClient.get<Prompt>(`${this.baseUrl}/${promptId}`)
}

createPrompt(Prompt: { title: string; content: string; categoryId: number }) {
  return this.httpClient.post<Prompt>(this.baseUrl, Prompt)

}

updatePrompt(promptId: number, Prompt: { title: string; content: string; categoryId: number }) {
  return this.httpClient.put<Prompt>(`${this.baseUrl}/${promptId}`, Prompt)

}

deletePrompt(promptId: number){
  return this.httpClient.delete(`${this.baseUrl}/${promptId}`)
}



}
