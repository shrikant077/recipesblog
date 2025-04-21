import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipes } from '../interfaces/recipes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private http: HttpClient) { }
  url = "http://localhost:3000/recipes";
  getRecipes(): Observable<Recipes[]> {
    return this.http.get<Recipes[]>(this.url);
  }

  addRecipe(recipe: Recipes): Observable<Recipes> {
    return this.http.post<Recipes>(this.url, recipe);
  }

  getRecipeById(id: string): Observable<Recipes> {
    return this.http.get<Recipes>(`${this.url}/${id}`);
  }

  deleteRecipe(id: string): Observable<Recipes> {
    return this.http.delete<Recipes>(`${this.url}/${id}`);
  }

  updateRecipe(id: string, updatedRecipe: Recipes): Observable<Recipes> {
    return this.http.put<Recipes>(`${this.url}/${id}`, updatedRecipe);
  }
}
