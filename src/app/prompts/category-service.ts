import { Category } from './category-model';
import { Injectable , inject} from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class CategoryService {


  httpClient = inject(HttpClient)
  baseUrl = environment.apiUrl + 'categories'

getCategories() {
  return this.httpClient.get<Category[]>(this.baseUrl)
}
}
